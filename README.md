# Crypto Watchlist

A premium, dark-themed React Native (Expo) application for tracking cryptocurrency market data. This app features real-time price updates, a persistent favorites watchlist, and a polished user interface.

## 🌟 Key Features

*   **Dark Mode & Pure Black Theme:** Optimized for OLED screens with a sleek, battery-saving pure black (`#000000`) background.
*   **Live Market Data:** Fetches real-time cryptocurrency data from the CoinGecko API.
*   **Favorites Watchlist:** Persists your favorite coins using `AsyncStorage`, so your list is saved between sessions.
*   **Search & Filter:** Instantly filter coins by name or symbol and toggle between "All Coins" and "My Watchlist".
*   **Pull to Refresh:** Easy manual data updates with a pull-down gesture.
*   **Premium Loading State:** Uses pulsing skeleton loaders for a smooth, app-like feel instead of basic spinners.
*   **Robust Error Handling:** Safely handles missing data (like nullable price changes) to prevent crashes.

## 🚀 Getting Started

### Prerequisites

*   **Node.js** (LTS recommended)
*   **pnpm** (Package manager used in this project)
*   **Expo Go** app on your iOS or Android device (for testing)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/cryptowatchlist.git
    cd cryptowatchlist
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    # or
    npx expo install
    ```

3.  **Start the development server:**
    ```bash
    npx expo start
    ```

4.  **Run on device:**
    *   Scan the QR code with your Android (Expo Go) or iOS (Camera) device.
    *   Press `a` for Android Emulator or `i` for iOS Simulator.

## 📂 Project Structure

```text
cryptowatchlist/
├── app/
│   ├── _layout.tsx       # Root layout, theme, and Context providers
│   └── index.tsx         # Main screen with FlatList, search, and filtering
├── components/
│   ├── CoinItem.tsx      # Reusable row component for each coin
│   ├── SkeletonItem.tsx  # Individual loading skeleton row
│   └── SkeletonLoader.tsx # List of skeletons for loading state
├── context/
│   └── FavoritesContext.tsx # Global state management for favorites (with persistence)
├── services/
│   └── coinGecko.ts      # API service for fetching market data
├── assets/               # Images and icons
├── app.json              # Expo configuration (themes, icons, splash screen)
└── package.json          # Dependencies and scripts
```

## 🛠️ Important Development Notes

### 1. Data Fetching & API
*   The app uses the public **CoinGecko API**.
*   **Note:** The public API has rate limits. If you encounter rate limiting errors (HTTP 429), waiting a minute usually resolves it.
*   Data types are defined in `services/coinGecko.ts`. Always handle potentially null values (e.g., `price_change_percentage_24h`).

### 2. State Management
*   **FavoritesContext:** Manages the list of favorite coin IDs.
*   **Persistence:** Uses `@react-native-async-storage/async-storage` to save favorites locally on the device.
*   When adding new global state, consider extending this Context pattern.

### 3. Styling & Theme
*   The app enforces a **Dark Mode** user interface style in `app.json`.
*   **Colors:**
    *   Background: `#000000` (Pure Black)
    *   Surface/Border: `#1a1a1a`
    *   Text: `#ffffff`
    *   Positive Change: `#4caf50`
    *   Negative Change: `#ff5252`
    *   Gold (Star): `#FFD700`

### 4. Performance Optimization
*   **FlatList:** Used for efficient list rendering.
*   **Memoization:** `useCallback` is used for the refresh handler to prevent unnecessary re-renders.
*   **Images:** Network images are cached by the device's image loader automatically.

### 5. Troubleshooting
*   **"Cannot redefine property: default"**: If you encounter this error with vector icons or navigation, ensure you are using named imports (e.g., `import { Ionicons } from '@expo/vector-icons'`) and avoid conflicting versions of `react-native-safe-area-context`.
*   **Package Manager:** This project uses `pnpm`. Avoid mixing `npm` or `yarn` lockfiles to prevent dependency conflicts.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'feat: add amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.