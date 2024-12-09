# Healing Honey eCommerce Store 🍯

<img width="1200" alt="Thumbnail (1)" src="/src/images/project-thumbnail.png">

## 🚀 Welcome to the Future of eCommerce!

Building an eCommerce store with crypto payments has never been easier! With just a few lines of code, you can start accepting payments and managing subscriptions.

Introducing **Healing Honey** - a cutting-edge eCommerce store built with [OnchainKit](https://onchainkit.xyz). This demo showcases the power of Web3 commerce with:

- ⚡ One-click USDC payments powered by Coinbase Commerce
- 💫 Crypto subscription payments
- 🔐 Smart Wallet integration for seamless account creation and login
- 🎨 Beautiful, responsive design

Try it live at: https://onchain-commerce-template.vercel.app/

## 🛠️ Setup

To get started, you'll need to set up a few environment variables in your `.env` file. Use `.local.env.example` as a reference.

### API Keys

1. Get your OnchainKit API key from the [Coinbase Developer Portal](https://portal.cdp.coinbase.com/products/onchainkit)
2. Get your Coinbase Commerce API key from [Coinbase Commerce](https://beta.commerce.coinbase.com/)

> New to Coinbase Commerce? No worries! Just create an account to get your API key.

## 🔧 Enabling Checkout

By default, checkout is disabled to prevent transactions in non-production environments. To enable it for local development:

1. Open `OnchainStoreCart.tsx`
2. Uncomment the checkout code and imports
3. Remove the `OnchainStoreModal` component and `MockCheckoutButton` (they're just for demo purposes)
4. Replace `products` in `OnchainStoreProvider` with your own items

> 💡 This template uses our advanced multi-product checkout implementation. Learn more in our [Checkout component docs](https://onchainkit.xyz/checkout/checkout).

## 🏃‍♂️ Running Locally

```sh
# Install bun (if you don't have it)
curl -fsSL https://bun.sh/install | bash

# Install packages
bun i

# Run Next app
bun run dev
```

## 📚 Resources

- [OnchainKit documentation](https://onchainkit.xyz)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

Built with ❤️ using OnchainKit
