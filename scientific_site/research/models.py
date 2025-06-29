from django.db import models
from django.urls import reverse
from django.utils import timezone

class ResearchArea(models.Model):
    """Categories for different research areas"""
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, help_text="FontAwesome icon class")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']

class Experiment(models.Model):
    """Individual experiments or research activities"""
    STATUS_CHOICES = [
        ('planning', 'Planning'),
        ('in_progress', 'In Progress'), 
        ('completed', 'Completed'),
        ('paused', 'Paused'),
        ('cancelled', 'Cancelled'),
    ]
    
    title = models.CharField(max_length=200)
    research_area = models.ForeignKey(ResearchArea, on_delete=models.CASCADE, related_name='experiments')
    description = models.TextField()
    hypothesis = models.TextField(blank=True, help_text="Research hypothesis")
    methodology = models.TextField(blank=True, help_text="Experimental methodology")
    results = models.TextField(blank=True, help_text="Experimental results")
    conclusions = models.TextField(blank=True, help_text="Conclusions and insights")
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planning')
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    
    # Mathematical content
    equations = models.TextField(blank=True, help_text="LaTeX equations")
    code_snippets = models.TextField(blank=True, help_text="Code implementations")
    
    # Metadata
    tags = models.CharField(max_length=500, blank=True, help_text="Comma-separated tags")
    difficulty_level = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)], default=3)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('experiment_detail', kwargs={'pk': self.pk})
    
    def get_tags_list(self):
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]
    
    class Meta:
        ordering = ['-created_at']

class Publication(models.Model):
    """Research publications and papers"""
    PUBLICATION_TYPES = [
        ('paper', 'Research Paper'),
        ('article', 'Article'),
        ('blog_post', 'Blog Post'),
        ('thesis', 'Thesis'),
        ('presentation', 'Presentation'),
    ]
    
    title = models.CharField(max_length=300)
    publication_type = models.CharField(max_length=20, choices=PUBLICATION_TYPES)
    abstract = models.TextField()
    content = models.TextField(help_text="Full content in Markdown/LaTeX")
    
    # Related experiments
    related_experiments = models.ManyToManyField(Experiment, blank=True)
    
    # Publication details
    authors = models.CharField(max_length=500, help_text="Comma-separated authors")
    journal_venue = models.CharField(max_length=200, blank=True)
    publication_date = models.DateField()
    doi = models.CharField(max_length=100, blank=True)
    url = models.URLField(blank=True)
    
    # Citation info
    citation_count = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('publication_detail', kwargs={'pk': self.pk})
    
    class Meta:
        ordering = ['-publication_date']

class ResearchNote(models.Model):
    """Quick notes and observations"""
    title = models.CharField(max_length=200)
    content = models.TextField()
    experiment = models.ForeignKey(Experiment, on_delete=models.CASCADE, null=True, blank=True)
    
    # Mathematical/code content
    has_equations = models.BooleanField(default=False)
    has_code = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-created_at']

class Dataset(models.Model):
    """Research datasets"""
    name = models.CharField(max_length=200)
    description = models.TextField()
    source = models.URLField(blank=True)
    file_path = models.CharField(max_length=500, blank=True)
    size_mb = models.FloatField(null=True, blank=True)
    
    # Related research
    experiments = models.ManyToManyField(Experiment, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']
