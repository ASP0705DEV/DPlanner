# Our Little Date Planner 💌 | For Chotu

> **“Chotu picks the vibe. The website finds the possibilities. Sonu makes the date happen.”**

A handcrafted, romantic surprise mobile web application built with lots of love for **Chotu**. Designed mobile-first for sharing on phones, with **zero mention of budget or money** (because love has no price tag), and a clean **single-vibe selection** flow that unlocks tailored choices, love slogans, doodle art, and real Jamshedpur spots.

---

## 🌸 Date Vibes Included (Single-Select Flow)

1. **Road Rides & Long Drives**:
   - Slogan: *“Hawa mein baal, hath meri kamar pe, aur lambi sadak... bas hum dono!”*
   - Choose vehicle: **Bike Ride** (Hold on tight) / **Car Drive** (AC/Heater & cozy songs) / **Scooter Cruise** (Breezy cruising).
   - Jamshedpur routes: Marine Drive riverfront, Dimna Lake Dam highway, Circuit House & Northern Town boulevards, Dalma foothills trail.
2. **Princess Treatment**:
   - Slogan: *“Zero stress, zero decisions. Today you sit back and get pampered like royalty.”*
   - Pampering choices: Full Body Spa & Massage, Hair Cut & Blowdry, Luxury Pedicure & Manicure, Nail Extensions & Cute Nail Art, All-in-One Royal Day.
   - Top Bistupur salons: Lakmé Salon, Geetanjali Salon, Naturals Lounge.
3. **Foodie Mode (Her Cravings)**:
   - Slogan: *“Whatever craving you have today, we are hunting it down and eating till happy!”*
   - Exact cravings: Juicy Shawarma, Kathi Rolls & Frankies, Steaming Hot Momos with spicy dip, Puchka & Dahi Puri, Cheesy Pizza, Late Night Waffles & Ice Cream.
   - Iconic Jamshedpur corners: Sakchi Market street bites, Novelty roll corners, The Chocolate Room.
4. **Aesthetic Café Date**:
   - Slogan: *“A cozy corner, warm iced latte, and 50 aesthetic candid photos of you!”*
   - Best Jamshedpur cafés: Brown Town Roastery Café (Bistupur), Le Bon Bakery & Café, Café Regal, Brubeck Bakery.
5. **Romantic Dinner Date**:
   - Slogan: *“Dress up pretty, my Rani. Tonight you get the finest dinner and my undivided attention.”*
   - Best dining: Khana Drama (Bistupur), Celsius Dining Lounge, Equinox at The Sonnet, Blue Diamond Restaurant.
6. **Street Food & Chaat Crawl**:
   - Slogan: *“Puchka contest: Extra teekha for me, perfect meetha-teekha for Chotu!”*
   - Locations: Sakchi Market Chaat Lane, Bistupur Main Road Food Trail, Golmuri Chowk.
7. **Sports & Fun Games**:
   - Slogan: *“Winner gets endless kisses, loser buys ice cream. Let the rivalry begin!”*
   - Games: Bowling Challenge, Pickleball Rallies, Pool / Snooker, Arcade Racing & Air Hockey, Outdoor Badminton.
8. **Movie Date**:
   - Slogan: *“I bring the snacks, you choose the movie, Chotu.”*
   - Choices: Big Screen Multiplex (PJP Cinepolis at P&M Mall, Eylex, Miraj) OR Cozy movie cuddles at home.
9. **Shopping Queen**:
   - Slogan: *“I will gladly carry every single shopping bag with a big proud smile.”*
   - Shopping missions: Cute Outfits & Dresses, Jhumkas & Korean Clips, Makeup & Fragrances, Surprise Gifts.
   - Jamshedpur spots: P&M City Centre Mall, Sakchi Market bazaars, Super Center boutiques.
10. **US Time (Airplane Mode Sanctuary)**:
    - Slogan: *“Phones in drawer, airplane mode ON. Just you and me, living in the present.”*
    - Uninterrupted intimate time: deep heart-to-heart talks, listening to music on the balcony, cooking Maggi/chai, reliving old memories.
11. **Steamy & Hot Romance**:
    - Slogan: *“Dim lights, burning candles, soft whispers, and no rush in the world.”*
    - Sensual mood: candlelight & scented oils, unrushed kisses, sensual slow-jams, electric passion.
12. **Chill Session (Drinks & Chill)**:
    - Slogan: *“Good music, peaceful vibe, endless laughs, and soul-deep relaxation.”*
    - Choose circle: **Just Sonu & Chotu** (Intimate couple talks & cuddles) OR **With All the Siblings** (Crazy fun party energy, cards, laughing till stomach hurts)!
13. **Her Time (Dil Khol Ke Baat)**:
    - Slogan: *“Safe space for you, Chotu. You can say anything, cry, vent, or laugh. I am right here listening.”*
    - What she can share: talk about what hurt or made her sad, rant about things, talk about our love & dreams, or just hold her while she speaks.
14. **Cuddle & Pure Peace**:
    - Slogan: *“Ghar pe rehna hai toh woh bhi date hai. Pure sukoon, head scratches, and warm blankets.”*
    - Comfort: gentle head scratches, tucked under fluffy blanket, deep peaceful nap, soft rain ambient sounds.

---

## 📱 Mobile-First Design & Journey

- **Screen 1 (`/`)**: Digital Love Letter with animated wax-seal envelope opening into pastel confetti, plus couple polaroid keepsakes.
- **Screen 2 (`/vibe`)**: Single-select Date Vibe with slogans and Hindi title badges.
- **Screen 3 (`/customize`)**: Deep contextual customizer with memory photo/doodle toggles, vehicle picker, pitstop treats, salon services, and Jamshedpur spots.
- **Screen 4 (`/timing-note`)**: Time of day & Chotu's personal sweet wish text note.
- **Screen 5 (`/wishlist`)**: Vintage love mail postcard summary, **automatic Gmail SMTP email notifications to Sonu (`saiprithvi0705@gmail.com`)**, and 1-click **WhatsApp direct sharing**.
- **Owner Dashboard (`/our-secret-dashboard`)**: Sonu's private dashboard to review submissions, inspect her exact choices, and manage status (`New`, `Reviewed`, `Planning`, `Completed`).

---

## 🚀 Running Locally

```bash
# In workspace
npm install
npm run dev
```

Open `http://localhost:5173` on your browser.

```bash
# Run test suite
npm run test

# Production build
npm run build
```

---

## 📧 Email Notifications Setup

Every time Chotu submits a date plan, an automated HTML email notification is dispatched directly to Sonu (`saiprithvi0705@gmail.com`) with all chosen options, vehicle, pitstop, timing, destination, and her secret note.
Configured via `.env` with Gmail SMTP on Port 465.
