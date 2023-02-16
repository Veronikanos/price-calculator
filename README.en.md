Читати [Українською](./README.en.md).

# Provider price comparison calculator

Live page [here](https://veronikanos.github.io/price-calculator/).

## The following tasks have been solved:

1. Price comparison of different providers. Prices and providers are provided by
   the terms of reference.
2. The graph is vertical for wide screens and horizontal for narrow ones. NOTE:
   You need to reload the page to see the redrawn graph when dynamically
   changing the width of the screen from wide to narrow and vice versa, The bar
   chart was drew with Chart.js library.
3. Two scales of Storage and Transfer in GB, with a step of 1 GB and a range
   from 0 to 1000 GB. Implemented using range type inputs.
4. Added icons of providers.
5. The column with the lowest price of the provider's color (red, orange,
   purple, blue). Other columns are gray.

Used JavaScript, Parcel, Chart.js library. Styled with scss.

### View on narrow screens (up to 768px)

![GitHub actions settings](./assets/mobile.png)

### View on wide screens (from 768px)

![GitHub actions settings](./assets/desktop.png)
![GitHub actions settings](./assets/desktop1.png)
