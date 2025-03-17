# How Do Good?

**A simple web application that suggests random acts of kindness and hosts curated classifieds aligned with humanist, nurturing values.**

[www.howdogood.com](http://www.howdogood.com)

## 🌟 Project Overview

"How Do Good?" is a minimalist web application designed to inspire and encourage small acts of kindness in everyday life. The application presents users with randomly generated suggestions for simple acts of kindness they can perform, along with a curated classified ads section aligned with our ethical values.

## ✨ Features

### 🏠 Home Page
- Displays the question "How Do Good?" centered on the page
- After a brief delay, reveals a randomly generated act of kindness
- Features smooth animations and a calming aesthetic
- Dark mode-friendly UI inspired by minimal designs like Obsidian

### 📋 Classifieds Page
- Curated list of advertisements manually approved to align with our ethical values
- Clean, distraction-free layout for easy readability
- Support for various categories of services and products

## 🎨 Design & Aesthetics

- **Color Palette**: Dark mode-oriented with muted, neutral tones
- **Typography**: Clean, accessible fonts for optimal readability
- **Animations**: Smooth transitions and loading effects for a polished experience
- **Philosophy**: Calm, thoughtful design that encourages reflection and intention

## 🛠️ Technology Stack

- **Frontend**: HTML, CSS, and JavaScript
- **Styling**: Custom CSS with dark mode support
- **Data Storage**: JSON files for acts of kindness and classified listings
- **Hosting**: GitHub Pages
- **Deployment**: Automated via GitHub Actions

## 📁 Project Structure

```
/ (Root Directory)
│── /public                # Static assets (images, icons, styles)
│── /src                   # Main source code directory
│   │── /components        # Reusable UI components
│   │── /pages             # Page-specific components
│   │   │── Home.js        # Main page logic
│   │   │── Classifieds.js # Classified ads page
│   │── /data              # Stores kindness acts & curated ads
│   │── /utils             # Utility functions (randomization, animations)
│── /styles                # CSS setup
│── /api                   # API endpoints for fetching kindness acts
│── package.json           # Dependencies & project scripts
│── .github/workflows      # GitHub Actions for CI/CD
│── CNAME                  # Custom domain configuration for GitHub Pages
│── README.md              # Documentation
```

## 🚀 Getting Started

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/howdogood.git
   cd howdogood
   ```

2. Open the project in your preferred code editor

3. For simple development, open the `index.html` file in your browser
   
4. For more advanced development with live reloading, you can use a local server:
   ```bash
   # Using Python's built-in HTTP server (Python 3)
   python -m http.server
   ```

### Deployment

This project is designed to be deployed on GitHub Pages:

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy the site
3. The site will be available at [www.howdogood.com](http://www.howdogood.com)

## ❤️ Contributing

Contributions to "How Do Good?" are welcome! If you have suggestions for new acts of kindness or improvements to the codebase, please feel free to submit a pull request or open an issue.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- Created with assistance from Claude 3.7
- Inspired by the belief that small acts of kindness can make a significant difference
- Special thanks to all contributors and supporters of this project

---

© 2025 How Do Good? | [www.howdogood.com](http://www.howdogood.com)
