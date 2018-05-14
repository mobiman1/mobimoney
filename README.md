# mobimoney

Mobimoney is an open-source, cross-platform mobile payments project, developed in React Native and utilizing the Expo
development tool (XDE). Specifically, Mobimoney provides a Scanner 
(QR code reader), Product Page, Shopping Cart, and Invoice modal to facilitate payments from mobile devices. Mobimoney
currently does not include payment gateway integration or login authorization, both of which are part of the V1.0 roadmap. 

<img src="https://mobimoney.com/images/screensMobimoney.jpg" />

## Expo Demo App
You may demo Mobimoney on a mobile device by scanning this QR code (requires Expo Client): 
<img src="https://mobimoney.com/images/shopping-cart.png" />

After loading Mobimoney you may scan the items below to test its features:

<img src="https://mobimoney.com/images/bear.jpg" /><img src="https://mobimoney.com/product-manager/productBear.png" />

<img src="https://mobimoney.com/images/flipFlops.jpg" /><img src="https://mobimoney.com/product-manager/productFlipFlops.png" />

<img src="https://mobimoney.com/images/book.jpg" /><img src="https://mobimoney.com/product-manager/productBook.png" />

## Getting Started

Open your terminal and navigate to the folder where you would like to download the Mobimoney repo, then copy/paste the
folling text:
```
> git clone https://github.com/mobiman1/mobimoney.git
```

Then cd to the "mobimoney" directory and install the dependencies:
```
> cd mobimoney
> npm install
```

## v1.0 Roadmap
Current release: v0.1.5

### v1.0 Todo:
- [ ] Dynamically obtain shop data, including: Shop name, shop logo, and prefered currency
- [ ] Add coupon code functionality
- [ ] Save favorited products
- [ ] Integrage payments gatway
- [ ] Integrate login authorization
- [ ] Write documentation

## Documentation
Coming soon...

## Technologies
<ul>
  <li>
Expo: Rapid development tool for React Native apps (allows for developing without touching Xcode/Android Studio; is pre-configured with hot-reloading; has its own app store for instant publishing; provides debug tools, etc.).
  </li>
  <li>

React Native: A library for developing cross-platform mobile apps using React's reactive architecture.
</li>
<li>
React Navigation: Provides cross-platform navigation. Chosen over React Native Navigation because: 1) Expo team recommends it; and 2) React Native Navigation is inundated with hundreds of open issues because the core team has switched attention to producing a new major release.
  </li>
  </ul>

<!-- ## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us. -->

<!-- ## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). -->

## Authors

* **Steve Becerra** - *Initial work* - [mobiman1](https://github.com/mobiman1)

<!-- See also the list of [contributors](https://github.com/mobiman1/mobimoney/contributors) who participated in this project. -->

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
