# Spend Permissions Demo App

<img  width="1200"  alt="Thumbnail (1)"  src="/src/images/project-thumbnail.png">

## Healing Honey

Healing Honey is a fictitious eCommerce site that utilizes Spend Permissions to offer onchain subscriptions to Manuka Honey.

This site was created to demonstrate [Spend Permissions]. With Spend Permissions, Smart Wallet users can authorize an app to spend funds on their behalf. This allows the app to execute subsequent transactions, within a specified set of rules, without additional user authentication. This greatly improves user experience and unlocks entirely new onchain functionality like automated subscription payments!

## Spend Permissions

Spend Permissions are enabled using EIP-712 signatures and work with both EOAs and Smart Accounts, such as [Smart Wallet].

Use cases include subscription payments, automatic buys (dollar-cost averaging), and sells, but many more are possible.

> [!IMPORTANT]
> To create a subscription service similar to traditional models, you need a server-side service (e.g., a cron job) that executes the Spend function on your behalf.

The Spend Permission struct is as follows:

| Field       | Type      | Description                                                                                |
| ----------- | --------- | ------------------------------------------------------------------------------------------ |
| `account`   | `address` | Smart account this spend permission is valid for.                                          |
| `spender`   | `address` | Entity that can spend `account`'s tokens.                                                  |
| `token`     | `address` | Token address (ERC-7528 native token address or ERC-20 contract).                          |
| `allowance` | `uint160` | Maximum allowed value to spend within each `period`.                                       |
| `period`    | `uint48`  | Time duration for resetting used `allowance` on a recurring basis (seconds).               |
| `start`     | `uint48`  | Timestamp this spend permission is valid starting at (unix seconds).                       |
| `end`       | `uint48`  | Timestamp this spend permission is valid until (unix seconds).                             |
| `salt`      | `uint256` | An arbitrary salt to differentiate unique spend permissions with otherwise identical data. |
| `extraData` | `bytes`   | Arbitrary data to include in the permission.                                               |

Spend Permissions can be approved offchain and revoked onchain (which requires gas). Smart Wallet users can manage (revoke) their Spend Permissions through the settings page of their Smart Wallet.

![REVOKE](https://i.imgur.com/mZOaocK.png)

> [!TIP]
> You can retrieve valid (non-revoked) spend permissions for an account by polling the utility API endpoint: https://rpc.wallet.coinbase.com. Refer to our [schema definition](https://www.smartwallet.dev/guides/spend-permissions/api-reference/coinbase-fetchpermissions) for details.

## Demo

This demo store is equipped with one-click USDC payments (leveraged by OnchainKit's [Checkout] component) and subscription payments (spend permissions).

For the purposes of this demo, USDC payments are disabled. However, you can enable them by following the instructions below.

Healing Honey uses Smart Wallets to allow for easy account creation (sign-up) and logins, utilizing components from the OnchainKit library.

### Features

- ⚡ One-click USDC payments
- 💫 Crypto subscription payments
- 🔐 Smart Wallet integration for seamless account creation and login

Try it live at: https://healing-honey.vercel.app/

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

- [Smart Wallet Spend Permissions documentation](https://www.smartwallet.dev/guides/spend-permissions/quick-start)
- [OnchainKit documentation](https://onchainkit.xyz)
- [Spend Permissions Repo](https://github.com/coinbase/spend-permissions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

[Spend Permissions]: https://www.smartwallet.dev/guides/spend-permissions/overview
[Smart Wallet]: https://www.smartwallet.dev/
[Checkout]: https://onchainkit.xyz/checkout/checkout
