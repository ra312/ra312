# LaTeX/MathJax Guide for Your Website

Your website now supports **full LaTeX mathematical notation** using MathJax! This guide shows you how to use it.

## 🧮 What's Already Set Up

✅ **MathJax 3** - Latest version for fast rendering  
✅ **Inline math** - For equations within text  
✅ **Display math** - For centered, larger equations  
✅ **Auto-rendering** - Works on page load and dynamic content  
✅ **Example equations** - Already added to your About section  

## 📝 How to Write Math

### Inline Math (within text)
Use single dollar signs `$...$` or `\(...\)`:

```latex
The algorithm has $O(n \log n)$ complexity.
Einstein's equation is $E = mc^2$.
The probability is $P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}$.
```

**Result**: The algorithm has $O(n \log n)$ complexity.

### Display Math (centered, larger)
Use double dollar signs `$$...$$` or `\[...\]`:

```latex
$$f(x) = \frac{1}{1 + e^{-x}}$$

$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$
```

**Result**: Large, centered equations

## 🎯 Common Mathematical Expressions

### Fractions
```latex
$\frac{numerator}{denominator}$
$\frac{a + b}{c - d}$
```

### Exponents and Subscripts
```latex
$x^2$, $x^{n+1}$, $e^{-\lambda t}$
$x_1$, $a_{i,j}$, $\sum_{i=1}^{n}$
```

### Greek Letters
```latex
$\alpha$, $\beta$, $\gamma$, $\delta$, $\epsilon$
$\lambda$, $\mu$, $\sigma$, $\pi$, $\theta$
$\Gamma$, $\Delta$, $\Lambda$, $\Sigma$, $\Omega$
```

### Common Functions
```latex
$\sin(x)$, $\cos(x)$, $\tan(x)$
$\log(x)$, $\ln(x)$, $\exp(x)$
$\sqrt{x}$, $\sqrt[n]{x}$
```

### Integrals and Derivatives
```latex
$\int f(x) dx$
$\int_{a}^{b} f(x) dx$
$\frac{d}{dx} f(x)$
$\frac{\partial}{\partial x} f(x,y)$
```

### Matrices
```latex
$$\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}$$

$$\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}$$
```

### Sets and Logic
```latex
$\{1, 2, 3, ..., n\}$
$x \in A$, $A \subset B$, $A \cup B$, $A \cap B$
$\forall x$, $\exists x$, $\implies$, $\iff$
```

## 🚀 Advanced Examples for Your Website

### Machine Learning
```latex
$$\text{Loss} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$$

$$\text{Softmax}(x_i) = \frac{e^{x_i}}{\sum_{j=1}^{K} e^{x_j}}$$

$$\nabla_\theta J(\theta) = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) x^{(i)}$$
```

### Algorithms
```latex
$$T(n) = 2T(n/2) + O(n) \Rightarrow T(n) = O(n \log n)$$

$$\text{Space Complexity: } S(n) = O(n)$$
```

### Statistics
```latex
$$\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i$$

$$\sigma^2 = \frac{1}{n-1} \sum_{i=1}^{n} (x_i - \bar{x})^2$$

$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$
```

### Computer Science
```latex
$$\text{Big O: } f(n) = O(g(n)) \text{ if } \exists c, n_0 : f(n) \leq c \cdot g(n) \text{ for } n \geq n_0$$

$$\text{Hash Function: } h(k) = k \bmod m$$
```

## 📍 Where to Add Math on Your Website

### 1. About Section (already done)
Current example shows algorithm complexity and sigmoid function.

### 2. Projects Section
Add math to describe algorithms used:
```html
<p>This project implements the Fast Fourier Transform with $O(n \log n)$ complexity:
$$X_k = \sum_{n=0}^{N-1} x_n \cdot e^{-i 2\pi k n / N}$$
</p>
```

### 3. Skills Section
Describe mathematical foundations:
```html
<p>Machine Learning: Understanding models like $h_\theta(x) = \theta_0 + \theta_1 x_1 + ... + \theta_n x_n$</p>
```

### 4. New Mathematics Section
Create a dedicated section for mathematical work:
```html
<section id="mathematics" class="mathematics">
    <div class="container">
        <h2 class="section-title">Mathematical Interests</h2>
        <div class="math-content">
            <p>I'm fascinated by the mathematical foundations of computer science...</p>
            $$\text{Your favorite equations here}$$
        </div>
    </div>
</section>
```

## 🎨 Styling Math (Optional)

You can style MathJax output with CSS:

```css
/* Add to styles.css */
.MathJax {
    font-size: 1.1em !important;
}

/* Color for display math */
.MathJax_Display {
    color: #2563eb;
}

/* Background for important equations */
.math-highlight {
    background: linear-gradient(45deg, #f3f4f6, #e5e7eb);
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
}
```

## 📱 Mobile Optimization

MathJax automatically handles:
- ✅ **Responsive sizing** on mobile devices
- ✅ **Touch interactions** for long equations
- ✅ **Scroll handling** for wide equations
- ✅ **Accessibility** features

## 🔧 Troubleshooting

### Math not rendering?
1. **Check syntax**: Ensure proper `$` or `$$` delimiters
2. **Escape characters**: Use `\\` instead of `\` in HTML
3. **Wait for load**: MathJax loads asynchronously

### Common syntax errors:
```latex
❌ $\frac{1}{2$ (missing closing brace)
✅ $\frac{1}{2}$

❌ $\sum_i=1^n$ (missing braces)
✅ $\sum_{i=1}^{n}$
```

### For dynamic content:
If you add math via JavaScript, call:
```javascript
MathJax.typesetPromise([element]).then(() => {
    // Math rendered
});
```

## 📖 Quick Reference

| Element | Inline | Display |
|---------|--------|---------|
| Fraction | `$\frac{a}{b}$` | `$$\frac{a}{b}$$` |
| Exponent | `$x^2$` | `$$x^2$$` |
| Subscript | `$x_1$` | `$$x_1$$` |
| Square root | `$\sqrt{x}$` | `$$\sqrt{x}$$` |
| Integral | `$\int f(x)dx$` | `$$\int f(x)dx$$` |
| Sum | `$\sum_{i=1}^n$` | `$$\sum_{i=1}^n$$` |
| Greek | `$\alpha, \beta$` | `$$\alpha, \beta$$` |

## 🌟 Pro Tips

1. **Preview locally**: Your math renders immediately when you open the HTML file
2. **Use LaTeX editors**: Write complex equations in a LaTeX editor first
3. **Check documentation**: [MathJax documentation](https://docs.mathjax.org/) for advanced features
4. **Performance**: MathJax is optimized and won't slow down your site

Your website now has professional mathematical typesetting capabilities! 🎓
