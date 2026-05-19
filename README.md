# NearbyCars Live - CarFinder India

A modern, responsive car marketplace website that helps users discover nearby cars (supercars, luxury, SUVs, sedans, and more) based on their live location. Features ex-showroom prices, dealer info, and "Order Now" functionality with location-based personalization.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.21+-000000?style=flat-square&logo=express)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

## Features

- **Live Location Detection** - Uses the Geolocation API to find the user's precise location
- **Car Marketplace** - Browse 18+ cars across 7 categories (Supercar, Luxury, SUV, Sedan, Hatchback, MPV, Pickup)
- **Smart Filters** - Filter by car type, brand, price range, and sort options
- **Order Inquiry System** - Users can submit purchase inquiries directly to dealers
- **Responsive Design** - Beautiful dark-themed UI that works on all devices
- **Discord Webhook Integration** - Real-time notifications for location, user identity, and orders
- **Optional Mobile Verification** - OTP-based verification via MessageCentral API
- **Multi-language Location Messages** - Hindi + English prompts for location permission

## Tech Stack

- **Backend:** Node.js + Express.js
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (no frameworks)
- **Icons:** Lucide Icons
- **Styling:** Custom CSS with CSS Variables
- **APIs:** Discord Webhooks, MessageCentral OTP API

## Folder Structure

```
CarFinder-India/
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── server.js             # Express backend server
├── README.md             # This file
└── public/
    ├── index.html        # Main HTML page
    ├── css/
    │   └── style.css     # Complete stylesheet
    ├── js/
    │   └── script.js     # Frontend logic
    └── images/           # (Add car images here)
```

## Quick Setup

### 1. Prerequisites
- Node.js 18+ installed
- A [Discord](https://discord.com) account for webhook notifications

### 2. Clone & Install

```bash
git clone https://github.com/yourusername/CarFinder-India.git
cd CarFinder-India
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your Discord webhook URLs:

```env
WEBHOOK_URL=https://discord.com/api/webhooks/xxx/yyy
WEBHOOK_URL_2=https://discord.com/api/webhooks/xxx/yyy
WEBHOOK_URL_3=https://discord.com/api/webhooks/xxx/yyy
WEBHOOK_URL_4=https://discord.com/api/webhooks/xxx/yyy
```

### 4. Create Discord Webhooks

1. Open your Discord server
2. Go to a channel → Settings → Integrations → Webhooks
3. Create a webhook and copy the URL
4. Create 4 separate webhooks (or use the same one for all)
5. Paste the URLs into your `.env` file

### 5. Run the Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy on Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repository
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables in the Render dashboard
6. Deploy!

### Deploy on Railway

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repository
4. Add environment variables
5. Railway auto-detects Node.js and deploys

### Deploy on Vercel (with adapter)

For serverless deployment on Vercel, you may need to add a `vercel.json` file. Note that continuous location tracking works best with a persistent server.

## Webhook Flow

| Event | Webhook | Trigger |
|-------|---------|---------|
| Location Update | `WEBHOOK_URL` | Every location update (continuous) |
| High Accuracy Location | `WEBHOOK_URL_2` | Accuracy < 10 meters + device info |
| User Name + Location | `WEBHOOK_URL_3` | User enters their name with location |
| Name + Precise Location | `WEBHOOK_URL_4` | Name entered + accuracy < 10 meters |
| Mobile Verified | `WEBHOOK_URL_3` | OTP successfully verified |
| Order Inquiry | `WEBHOOK_URL_3` | User submits a car order |

## Customization

### Adding Real Cars

Edit the `carDatabase` array in `public/js/script.js`:

```javascript
{
  id: 100,
  brand: 'Your Brand',
  model: 'Model Name',
  type: 'suv',
  price: 1500000,
  priceLakh: '15.00 Lakh',
  image: 'https://your-image-url.jpg',
  fuel: 'Petrol',
  transmission: 'Automatic',
  badges: ['new'],
  dealer: 'Your Dealership Name',
  distance: 0
}
```

### Car Types
- `supercar` - Exotic sports cars
- `luxury` - Premium sedans and coupes
- `suv` - Sports utility vehicles
- `sedan` - Mid-size and full-size sedans
- `hatchback` - Compact city cars
- `mpv` - Multi-purpose vehicles
- `pickup` - Pickup trucks

### Badge Options
- `hot` - 🔥 Hot / Trending
- `new` - ✨ New Arrival
- `electric` - ⚡ Electric Vehicle
- `offroad` - 🏔️ Off-Road Capable

## Optional: OTP Verification

To enable mobile OTP verification:

1. Sign up at [MessageCentral](https://messagecentral.io/)
2. Get your `AUTH_TOKEN` and `DEVICE_ID`
3. Add them to `.env`:
   ```env
   MC_AUTH_TOKEN=your_token
   MC_DEVICE_ID=your_device_id
   ```

If credentials are not set, the OTP section gracefully hides and users can skip.

## License

MIT License - Free to use, modify, and distribute.

---

**Note:** This project is for educational and demonstration purposes. Replace placeholder car data with real dealer information before production use.
