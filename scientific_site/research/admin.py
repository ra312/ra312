from django.contrib import admin
from .models import ResearchArea, Experiment, Publication, ResearchNote, Dataset

@admin.register(ResearchArea)
class ResearchAreaAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['name']

@admin.register(Experiment)
class ExperimentAdmin(admin.ModelAdmin):
    list_display = ['title', 'research_area', 'status', 'start_date', 'difficulty_level']
    list_filter = ['status', 'research_area', 'difficulty_level', 'start_date']
    search_fields = ['title', 'description', 'tags']
    date_hierarchy = 'start_date'
    ordering = ['-created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'research_area', 'description', 'status')
        }),
        ('Research Details', {
            'fields': ('hypothesis', 'methodology', 'results', 'conclusions')
        }),
        ('Timeline', {
            'fields': ('start_date', 'end_date')
        }),
        ('Mathematical Content', {
            'fields': ('equations', 'code_snippets'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('tags', 'difficulty_level'),
            'classes': ('collapse',)
        })
    )

@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ['title', 'publication_type', 'publication_date', 'citation_count']
    list_filter = ['publication_type', 'publication_date']
    search_fields = ['title', 'abstract', 'authors']
    date_hierarchy = 'publication_date'
    ordering = ['-publication_date']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'publication_type', 'abstract')
        }),
        ('Content', {
            'fields': ('content',)
        }),
        ('Publication Details', {
            'fields': ('authors', 'journal_venue', 'publication_date', 'doi', 'url')
        }),
        ('Relations', {
            'fields': ('related_experiments',),
            'classes': ('collapse',)
        }),
        ('Metrics', {
            'fields': ('citation_count',),
            'classes': ('collapse',)
        })
    )
    
    filter_horizontal = ['related_experiments']

@admin.register(ResearchNote)
class ResearchNoteAdmin(admin.ModelAdmin):
    list_display = ['title', 'experiment', 'has_equations', 'has_code', 'created_at']
    list_filter = ['has_equations', 'has_code', 'experiment', 'created_at']
    search_fields = ['title', 'content']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']

@admin.register(Dataset)
class DatasetAdmin(admin.ModelAdmin):
    list_display = ['name', 'size_mb', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['name']
    filter_horizontal = ['experiments']
