# Rauan Akylzhanov - Personal Website

A modern, responsive personal website built with HTML5, CSS3, and JavaScript. Features a clean design, smooth animations, and mobile-first approach.

## 🚀 Features

- **Responsive Design**: Works seamlessly across all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Smooth scrolling, animated navigation, particle effects
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Fast loading times and smooth animations
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 📁 Project Structure

```
rauan-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality and interactions
└── README.md           # This file
```

## 🛠️ Customization Guide

### Personal Information

1. **Update Personal Details** in `index.html`:
   - Change name in the hero section (line 39)
   - Update contact information (lines 216-224)
   - Modify social media links (lines 228-231)

2. **Update Professional Information**:
   - Edit the "About Me" section (lines 68-77)
   - Customize skills and technologies (lines 104-135)
   - Update experience stats (lines 80-91)

### Projects Section

1. **Add Your Projects** in `index.html`:
   - Replace the example projects (lines 145-200)
   - Update project titles, descriptions, and technologies
   - Add your project links (GitHub, live demos)

2. **Project Icons**: Currently using Font Awesome icons. You can:
   - Replace with your project screenshots
   - Use different icons from Font Awesome
   - Add custom project images

### Styling

1. **Colors**: Update the color scheme in `styles.css`:
   - Primary color: `#2563eb` (blue)
   - Secondary color: `#7c3aed` (purple)
   - Accent color: `#fbbf24` (yellow/orange)

2. **Fonts**: Currently using Inter. To change:
   - Update the Google Fonts import in `index.html` (line 10)
   - Change the font-family in `styles.css` (line 13)

3. **Background**: Modify the hero background gradient in `styles.css` (line 110)

### Content Sections

You can easily add or remove sections by:
1. Adding new sections in `index.html`
2. Adding corresponding navigation links
3. Updating the JavaScript scroll handling if needed

## 🚀 Deployment Options

### Option 1: GitHub Pages (Free)
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)
1. Create an account on [Netlify](https://netlify.com)
2. Drag and drop your project folder to Netlify
3. Your site will be deployed instantly with a custom URL
4. Optional: Connect your GitHub repository for automatic deployments

### Option 3: Vercel (Free)
1. Create an account on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Deploy with zero configuration
4. Get automatic deployments on every push

### Option 4: Traditional Web Hosting
1. Upload all files to your web hosting provider
2. Ensure `index.html` is in the root directory
3. Configure your domain if needed

## 📱 Mobile Optimization

The website is fully responsive and includes:
- Mobile-first CSS approach
- Touch-friendly navigation
- Optimized images and animations
- Fast loading on mobile networks

## 🔧 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance Tips

1. **Images**: If you add custom images, optimize them:
   - Use WebP format when possible
   - Compress images to reduce file size
   - Use appropriate dimensions

2. **Fonts**: The current setup uses Google Fonts with `display=swap` for better performance

3. **JavaScript**: All animations are optimized and use throttling for scroll events

## 🎨 Customization Examples

### Changing the Color Scheme
```css
/* In styles.css, replace the primary colors */
:root {
  --primary-color: #your-color;
  --secondary-color: #your-secondary;
  --accent-color: #your-accent;
}
```

### Adding a New Section
```html
<!-- Add to index.html -->
<section id="new-section" class="new-section">
    <div class="container">
        <h2 class="section-title">New Section</h2>
        <!-- Your content here -->
    </div>
</section>
```

### Custom Animations
The website uses CSS animations and JavaScript for interactivity. You can customize:
- Loading animations
- Scroll reveals
- Hover effects
- Transition timings

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you make improvements, pull requests are welcome!

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## 🙋‍♂️ Support

If you need help customizing the website or have questions:
1. Check the code comments for guidance
2. Refer to this README for common customizations
3. Look up CSS/JavaScript documentation for advanced modifications

---

**Note**: Remember to update all placeholder content with your actual information before deploying your website!
