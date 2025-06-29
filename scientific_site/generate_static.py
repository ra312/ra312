#!/usr/bin/env python3
"""
Static Site Generator for Scientific Exploration Site
Converts Django app content to static HTML files for GitHub Pages deployment
"""

import os
import sys
import django
from pathlib import Path
import shutil
from django.template.loader import render_to_string
from django.conf import settings
from django.test import RequestFactory

# Add the project directory to Python path
project_dir = Path(__file__).parent
sys.path.insert(0, str(project_dir))

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'scientific_exploration.settings')
django.setup()

from research.models import ResearchArea, Experiment, Publication, ResearchNote

class StaticSiteGenerator:
    def __init__(self, output_dir="../"):
        self.output_dir = Path(output_dir)
        self.request_factory = RequestFactory()
        
    def generate_index(self):
        """Generate main index.html with overview of research"""
        try:
            # Get recent data
            recent_experiments = Experiment.objects.all()[:5]
            recent_publications = Publication.objects.all()[:5]
            research_areas = ResearchArea.objects.all()
            
            context = {
                'recent_experiments': recent_experiments,
                'recent_publications': recent_publications,
                'research_areas': research_areas,
                'total_experiments': Experiment.objects.count(),
                'total_publications': Publication.objects.count(),
            }
            
            # Read existing index.html and inject research data
            existing_index = self.output_dir / 'index.html'
            if existing_index.exists():
                with open(existing_index, 'r') as f:
                    content = f.read()
                
                # Add research section before the closing body tag
                research_section = self.generate_research_section(context)
                content = content.replace('</body>', f'{research_section}</body>')
                
                with open(existing_index, 'w') as f:
                    f.write(content)
                    
                print(f"✅ Updated index.html with research data")
            else:
                print("❌ index.html not found")
                
        except Exception as e:
            print(f"❌ Error generating index: {e}")
    
    def generate_research_section(self, context):
        """Generate research section HTML"""
        return f'''
        <hr class="m-0">
        
        <!-- Research Dashboard Section -->
        <section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="research-dashboard">
            <div class="w-100">
                <h2 class="mb-5">Research Dashboard</h2>
                
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="box-item">
                            <h3>📊 Statistics</h3>
                            <p><strong>Total Experiments:</strong> {context['total_experiments']}</p>
                            <p><strong>Total Publications:</strong> {context['total_publications']}</p>
                            <p><strong>Research Areas:</strong> {len(context['research_areas'])}</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="box-item">
                            <h3>🔬 Research Areas</h3>
                            {''.join([f'<p><i class="{area.icon}"></i> {area.name}</p>' for area in context['research_areas']])}
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <h3>Recent Experiments</h3>
                        {''.join([f'''
                        <div class="box-item">
                            <h4>{exp.title}</h4>
                            <p><strong>Status:</strong> {exp.get_status_display()}</p>
                            <p><strong>Area:</strong> {exp.research_area.name}</p>
                            <p>{exp.description[:100]}...</p>
                            <p><small>Started: {exp.start_date}</small></p>
                        </div>
                        ''' for exp in context['recent_experiments']])}
                    </div>
                    <div class="col-md-6">
                        <h3>Recent Publications</h3>
                        {''.join([f'''
                        <div class="box-item">
                            <h4>{pub.title}</h4>
                            <p><strong>Type:</strong> {pub.get_publication_type_display()}</p>
                            <p>{pub.abstract[:100]}...</p>
                            <p><small>Published: {pub.publication_date}</small></p>
                        </div>
                        ''' for pub in context['recent_publications']])}
                    </div>
                </div>
            </div>
        </section>
        '''
    
    def generate_experiment_pages(self):
        """Generate individual experiment pages"""
        experiments_dir = self.output_dir / "experiments"
        experiments_dir.mkdir(exist_ok=True)
        
        experiments = Experiment.objects.all()
        
        for experiment in experiments:
            filename = f"experiment_{experiment.pk}.html"
            filepath = experiments_dir / filename
            
            # Generate experiment page content
            content = self.generate_experiment_page(experiment)
            
            with open(filepath, 'w') as f:
                f.write(content)
            
            print(f"✅ Generated {filename}")
    
    def generate_experiment_page(self, experiment):
        """Generate HTML for individual experiment"""
        return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{experiment.title} - Rauan Akylzhanov</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../styles.css">
    
    <!-- MathJax for LaTeX rendering -->
    <script>
        MathJax = {{
            tex: {{
                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                processEscapes: true,
                processEnvironments: true
            }},
            options: {{
                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
            }}
        }};
    </script>
    <script type="text/javascript" id="MathJax-script" async
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
    </script>
</head>
<body id="page-top">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
        <a class="navbar-brand js-scroll-trigger" href="../index.html">
            <span class="d-none d-lg-block">
                <div class="profile-image-container">
                    <i class="fas fa-user-circle profile-icon"></i>
                </div>
            </span>
        </a>
    </nav>

    <div class="container-fluid p-0">
        <section class="resume-section p-3 p-lg-5">
            <div class="w-100">
                <h1 class="mb-3">{experiment.title}</h1>
                
                <div class="box-item mb-4">
                    <h3><i class="fas fa-info-circle"></i> Experiment Details</h3>
                    <p><strong>Research Area:</strong> {experiment.research_area.name}</p>
                    <p><strong>Status:</strong> {experiment.get_status_display()}</p>
                    <p><strong>Difficulty Level:</strong> {experiment.difficulty_level}/5</p>
                    <p><strong>Start Date:</strong> {experiment.start_date}</p>
                    {f'<p><strong>End Date:</strong> {experiment.end_date}</p>' if experiment.end_date else ''}
                    {f'<p><strong>Tags:</strong> {experiment.tags}</p>' if experiment.tags else ''}
                </div>
                
                <div class="box-item mb-4">
                    <h3><i class="fas fa-file-alt"></i> Description</h3>
                    <p>{experiment.description}</p>
                </div>
                
                {f'''
                <div class="box-item mb-4">
                    <h3><i class="fas fa-lightbulb"></i> Hypothesis</h3>
                    <p>{experiment.hypothesis}</p>
                </div>
                ''' if experiment.hypothesis else ''}
                
                {f'''
                <div class="box-item mb-4">
                    <h3><i class="fas fa-cogs"></i> Methodology</h3>
                    <p>{experiment.methodology}</p>
                </div>
                ''' if experiment.methodology else ''}
                
                {f'''
                <div class="box-item mb-4">
                    <h3><i class="fas fa-chart-line"></i> Results</h3>
                    <p>{experiment.results}</p>
                </div>
                ''' if experiment.results else ''}
                
                {f'''
                <div class="box-item mb-4">
                    <h3><i class="fas fa-brain"></i> Conclusions</h3>
                    <p>{experiment.conclusions}</p>
                </div>
                ''' if experiment.conclusions else ''}
                
                {f'''
                <div class="box-item mb-4">
                    <h3><i class="fas fa-calculator"></i> Mathematical Content</h3>
                    <div class="equation-container">
                        {experiment.equations}
                    </div>
                </div>
                ''' if experiment.equations else ''}
                
                {f'''
                <div class="box-item mb-4">
                    <h3><i class="fas fa-code"></i> Code Implementation</h3>
                    <pre><code>{experiment.code_snippets}</code></pre>
                </div>
                ''' if experiment.code_snippets else ''}
                
                <div class="mt-4">
                    <a href="../index.html" class="btn btn-outline-primary">← Back to Home</a>
                </div>
            </div>
        </section>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>'''
    
    def generate_all(self):
        """Generate all static files"""
        print("🚀 Starting static site generation...")
        
        # Ensure output directory exists
        self.output_dir.mkdir(exist_ok=True)
        
        # Generate pages
        self.generate_index()
        self.generate_experiment_pages()
        
        print("✅ Static site generation completed!")
        print(f"📁 Files generated in: {self.output_dir.absolute()}")

def main():
    generator = StaticSiteGenerator()
    generator.generate_all()

if __name__ == "__main__":
    main()
