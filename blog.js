// Blog Management System
class BlogManager {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.posts = [];
        this.currentEditingPost = null;
        
        // Default admin credentials (in production, use proper authentication)
        this.adminCredentials = {
            username: 'rauan',
            password: 'blog2024!'
        };
        
        this.init();
    }
    
    init() {
        this.loadPosts();
        this.checkAuthentication();
        this.bindEvents();
        this.renderPosts();
    }
    
    // Authentication methods
    checkAuthentication() {
        const authData = localStorage.getItem('blog_auth');
        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                if (parsed.username === this.adminCredentials.username && 
                    Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) { // 24 hour session
                    this.isAuthenticated = true;
                    this.currentUser = parsed.username;
                    this.showAdminInterface();
                }
            } catch (e) {
                localStorage.removeItem('blog_auth');
            }
        }
    }
    
    login(username, password) {
        if (username === this.adminCredentials.username && 
            password === this.adminCredentials.password) {
            this.isAuthenticated = true;
            this.currentUser = username;
            
            // Store authentication
            localStorage.setItem('blog_auth', JSON.stringify({
                username: username,
                timestamp: Date.now()
            }));
            
            this.showAdminInterface();
            this.closeModal('login-modal');
            this.showNotification('Login successful!', 'success');
            return true;
        } else {
            this.showNotification('Invalid credentials', 'error');
            return false;
        }
    }
    
    logout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        localStorage.removeItem('blog_auth');
        this.hideAdminInterface();
        this.showNotification('Logged out successfully', 'success');
    }
    
    showAdminInterface() {
        document.getElementById('admin-controls').style.display = 'block';
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'inline-block';
        
        // Add edit/delete buttons to existing posts
        this.renderPosts();
    }
    
    hideAdminInterface() {
        document.getElementById('admin-controls').style.display = 'none';
        document.getElementById('login-btn').style.display = 'inline-block';
        document.getElementById('logout-btn').style.display = 'none';
        
        // Remove edit/delete buttons
        this.renderPosts();
    }
    
    // Post management methods
    loadPosts() {
        const stored = localStorage.getItem('blog_posts');
        if (stored) {
            try {
                this.posts = JSON.parse(stored);
            } catch (e) {
                this.posts = [];
            }
        }
    }
    
    savePosts() {
        localStorage.setItem('blog_posts', JSON.stringify(this.posts));
    }
    
    createPost(postData) {
        const post = {
            id: this.generateId(),
            title: postData.title,
            slug: postData.slug || this.generateSlug(postData.title),
            content: postData.content,
            excerpt: postData.excerpt || this.generateExcerpt(postData.content),
            category: postData.category,
            tags: postData.tags ? postData.tags.split(',').map(tag => tag.trim()) : [],
            published: postData.published,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            author: this.currentUser
        };
        
        this.posts.unshift(post); // Add to beginning
        this.savePosts();
        this.renderPosts();
        this.showNotification('Post created successfully!', 'success');
        
        return post;
    }
    
    updatePost(postId, postData) {
        const index = this.posts.findIndex(post => post.id === postId);
        if (index !== -1) {
            this.posts[index] = {
                ...this.posts[index],
                title: postData.title,
                slug: postData.slug || this.generateSlug(postData.title),
                content: postData.content,
                excerpt: postData.excerpt || this.generateExcerpt(postData.content),
                category: postData.category,
                tags: postData.tags ? postData.tags.split(',').map(tag => tag.trim()) : [],
                published: postData.published,
                updatedAt: new Date().toISOString()
            };
            
            this.savePosts();
            this.renderPosts();
            this.showNotification('Post updated successfully!', 'success');
            return this.posts[index];
        }
        return null;
    }
    
    deletePost(postId) {
        const index = this.posts.findIndex(post => post.id === postId);
        if (index !== -1) {
            if (confirm('Are you sure you want to delete this post?')) {
                this.posts.splice(index, 1);
                this.savePosts();
                this.renderPosts();
                this.showNotification('Post deleted successfully!', 'success');
            }
        }
    }
    
    // Rendering methods
    renderPosts() {
        const container = document.getElementById('blog-posts');
        const emptyState = document.getElementById('empty-state');
        
        // Filter published posts for public view
        const visiblePosts = this.isAuthenticated ? 
            this.posts : 
            this.posts.filter(post => post.published);
        
        if (visiblePosts.length === 0) {
            container.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }
        
        emptyState.style.display = 'none';
        container.innerHTML = visiblePosts.map(post => this.renderPost(post)).join('');
        
        // Re-render MathJax for any math content
        if (window.MathJax) {
            MathJax.typesetPromise([container]).catch((err) => 
                console.log('MathJax typeset failed: ' + err.message)
            );
        }
    }
    
    renderPost(post) {
        const adminButtons = this.isAuthenticated ? `
            <div class="post-admin-actions" style="margin-top: 1rem;">
                <button class="btn btn-sm btn-outline" onclick="blogManager.editPost('${post.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-secondary" onclick="blogManager.deletePost('${post.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
                ${!post.published ? '<span class="draft-badge">DRAFT</span>' : ''}
            </div>
        ` : '';
        
        return `
            <article class="blog-post">
                <h2 class="blog-post-title">${this.escapeHtml(post.title)}</h2>
                <div class="blog-post-meta">
                    <span><i class="fas fa-calendar"></i> ${this.formatDate(post.createdAt)}</span>
                    <span><i class="fas fa-folder"></i> ${post.category}</span>
                    ${post.tags.length > 0 ? `<span><i class="fas fa-tags"></i> ${post.tags.join(', ')}</span>` : ''}
                </div>
                <div class="blog-post-content">
                    ${this.renderMarkdown(post.content)}
                </div>
                ${adminButtons}
            </article>
        `;
    }
    
    // Utility methods
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    generateSlug(title) {
        return title.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }
    
    generateExcerpt(content, length = 150) {
        const text = content.replace(/[#*`\[\]]/g, '').replace(/\n/g, ' ');
        return text.length > length ? text.substring(0, length) + '...' : text;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Simple markdown renderer
    renderMarkdown(content) {
        return content
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Inline code
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            // Code blocks
            .replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<pre><code>$2</code></pre>')
            // Line breaks
            .replace(/\n/g, '<br>');
    }
    
    // Modal methods
    openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }
    
    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }
    
    // Post editor methods
    openPostEditor(post = null) {
        this.currentEditingPost = post;
        
        if (post) {
            document.getElementById('editor-title').textContent = 'Edit Post';
            document.getElementById('post-title').value = post.title;
            document.getElementById('post-slug').value = post.slug;
            document.getElementById('post-category').value = post.category;
            document.getElementById('post-tags').value = post.tags.join(', ');
            document.getElementById('post-excerpt').value = post.excerpt;
            document.getElementById('post-content').value = post.content;
            document.getElementById('post-published').checked = post.published;
        } else {
            document.getElementById('editor-title').textContent = 'Create New Post';
            document.getElementById('post-form').reset();
            document.getElementById('post-published').checked = true;
        }
        
        this.openModal('post-editor-modal');
    }
    
    editPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            this.openPostEditor(post);
        }
    }
    
    // Auto-generate slug from title
    updateSlug() {
        const title = document.getElementById('post-title').value;
        const slugField = document.getElementById('post-slug');
        if (!slugField.value || this.generateSlug(slugField.value) !== slugField.value) {
            slugField.value = this.generateSlug(title);
        }
    }
    
    // Preview functionality
    previewPost() {
        const content = document.getElementById('post-content').value;
        const title = document.getElementById('post-title').value;
        
        const previewContent = document.getElementById('preview-content');
        previewContent.innerHTML = `
            <h1>${this.escapeHtml(title)}</h1>
            <div class="blog-post-content">
                ${this.renderMarkdown(content)}
            </div>
        `;
        
        this.openModal('preview-modal');
        
        // Re-render MathJax
        if (window.MathJax) {
            MathJax.typesetPromise([previewContent]).catch((err) => 
                console.log('MathJax typeset failed: ' + err.message)
            );
        }
    }
    
    // Editor toolbar functions
    insertAtCursor(textarea, text) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(end);
        
        textarea.value = before + text + after;
        textarea.selectionStart = textarea.selectionEnd = start + text.length;
        textarea.focus();
    }
    
    wrapSelection(textarea, wrapper) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const replacement = wrapper + selectedText + wrapper;
        
        textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
        textarea.selectionStart = start + wrapper.length;
        textarea.selectionEnd = end + wrapper.length;
        textarea.focus();
    }
    
    // Notification system
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 1rem;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Event binding
    bindEvents() {
        // Login modal
        document.getElementById('login-btn').addEventListener('click', () => {
            this.openModal('login-modal');
        });
        
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });
        
        // Login form
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            this.login(username, password);
        });
        
        // New post button
        document.getElementById('new-post-btn').addEventListener('click', () => {
            this.openPostEditor();
        });
        
        // Post form
        document.getElementById('post-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const postData = Object.fromEntries(formData.entries());
            postData.published = formData.has('published');
            
            if (this.currentEditingPost) {
                this.updatePost(this.currentEditingPost.id, postData);
            } else {
                this.createPost(postData);
            }
            
            this.closeModal('post-editor-modal');
        });
        
        // Auto-generate slug
        document.getElementById('post-title').addEventListener('input', () => {
            this.updateSlug();
        });
        
        // Save draft
        document.getElementById('save-draft').addEventListener('click', () => {
            const formData = new FormData(document.getElementById('post-form'));
            const postData = Object.fromEntries(formData.entries());
            postData.published = false;
            
            if (this.currentEditingPost) {
                this.updatePost(this.currentEditingPost.id, postData);
            } else {
                this.createPost(postData);
            }
            
            this.closeModal('post-editor-modal');
        });
        
        // Cancel post
        document.getElementById('cancel-post').addEventListener('click', () => {
            this.closeModal('post-editor-modal');
        });
        
        // Editor toolbar
        document.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = btn.getAttribute('data-action');
                const textarea = document.getElementById('post-content');
                
                switch (action) {
                    case 'bold':
                        this.wrapSelection(textarea, '**');
                        break;
                    case 'italic':
                        this.wrapSelection(textarea, '*');
                        break;
                    case 'code':
                        this.wrapSelection(textarea, '`');
                        break;
                    case 'link':
                        this.insertAtCursor(textarea, '[text](url)');
                        break;
                    case 'math':
                        this.insertAtCursor(textarea, '$equation$');
                        break;
                    case 'preview':
                        this.previewPost();
                        break;
                }
            });
        });
        
        // Close modals
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
        
        // Close modal on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }
}

// Initialize blog manager
const blogManager = new BlogManager();

// Add some demo posts for testing (only if no posts exist)
if (blogManager.posts.length === 0) {
    const demoPosts = [
        {
            id: 'demo-1',
            title: 'Welcome to My Technical Blog',
            slug: 'welcome-to-my-technical-blog',
            content: `# Welcome to My Technical Blog!

This is my first blog post where I'll be sharing insights about **technology**, **programming**, and **mathematics**.

## What to Expect

I'll be covering topics such as:

- Web development techniques
- Mathematical algorithms
- Software engineering best practices
- Research insights

### Code Examples

Here's a simple JavaScript function:

\`\`\`javascript
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
\`\`\`

### Mathematical Notation

I can also include mathematical expressions like $E = mc^2$ or more complex equations:

$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

Stay tuned for more content!`,
            excerpt: 'Welcome to my technical blog where I share insights about technology, programming, and mathematics.',
            category: 'personal',
            tags: ['welcome', 'blog', 'introduction'],
            published: true,
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
            updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            author: 'rauan'
        }
    ];
    
    blogManager.posts = demoPosts;
    blogManager.savePosts();
    blogManager.renderPosts();
}
