# 🚀 Expo React Native Boilerplate

Modern React Native boilerplate with Expo, TypeScript, and best practices.

## ✨ Features

- **🎨 UI/UX**: NativeWind (Tailwind), Custom Typography, Light Theme
- **🌍 i18n**: Turkish & English support with i18n-js
- **🔐 Auth**: Context API, Secure Storage, Auto Login
- **📱 Navigation**: Expo Router, Custom Tab Bar
- **🔄 State**: React Query, Optimistic Updates, Cache Management
- **🌐 API**: DummyJSON integration, Full CRUD operations

## 🛠️ Tech Stack

- **React Native** + **Expo**
- **TypeScript** + **NativeWind (Tailwind)**
- **Expo Router** + **React Query**
- **i18n-js** + **AsyncStorage**

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the app
npx expo start
```

## 📱 App Features

- **Home**: User profile, product list (DummyJSON), delete products
- **Explore**: Product search, add new products, form validation
- **Profile**: User info, profile photo, settings access
- **Settings**: Language switching (TR/EN), app info, logout

## 🎨 Design System

### Colors
```typescript
primaryBackground: "#F8FAFC"  // Light gray background
mainColor: "#3B82F6"          // Blue primary
secondaryColor: "#10B981"     // Green success
dangerColor: "#EF4444"        // Red danger
```

### Typography
- **title1**: 28px, Bold
- **body2**: 16px, Medium
- **caption**: 12px, Regular

## 🌍 i18n Usage

```typescript
const { t, changeLanguage } = useLanguage();

// Change language
changeLanguage('en'); // English
changeLanguage('tr'); // Turkish

// Use translations
<Text>{t('common.loading')}</Text>
```

## 📊 API Integration

Uses **DummyJSON** for test data:

## 🔧 Project Structure

```
├── app/                    # Pages (Expo Router)
├── components/             # Reusable components
│   ├── HomePage/          # Home components
│   ├── ExplorePage/       # Explore components
│   ├── ProfilePage/       # Profile components
│   └── ui/                # UI components
├── contexts/              # React Contexts
├── hooks/                 # Custom hooks
├── services/              # API services
├── types/                 # TypeScript types
├── utils/                 # Utilities
└── locales/               # Translation files
```

## 🚀 Production Ready

- ✅ TypeScript support
- ✅ ESLint configuration
- ✅ Error boundaries
- ✅ Loading states
- ✅ Offline handling

## 📄 License

MIT License

---

**⭐ Star this repo if you like it!**
