import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditableText = ({ text, onSave, className = '' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        className={`w-full ${className}`}
        autoFocus
      />
    );
  }

  return (
    <div 
      className={`cursor-text ${className}`} 
      onClick={() => setIsEditing(true)}
    >
      {text}
    </div>
  );
};

const EditableList = ({ items, onUpdate, className = '' }) => {
  const [localItems, setLocalItems] = useState([...items]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    setLocalItems([...items]);
  }, [items]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      const updated = [...localItems, newItem];
      setLocalItems(updated);
      onUpdate(updated);
      setNewItem('');
    }
  };

  const handleUpdate = (index, value) => {
    const updated = [...localItems];
    updated[index] = value;
    setLocalItems(updated);
    onUpdate(updated);
  };

  const handleRemove = (index) => {
    const updated = localItems.filter((_, i) => i !== index);
    setLocalItems(updated);
    onUpdate(updated);
  };

  return (
    <div className={className}>
      <ul className="space-y-1">
        {localItems.map((item, index) => (
          <li key={index} className="flex items-center group">
            <span className="mr-2">•</span>
            <EditableText
              text={item}
              onSave={(value) => handleUpdate(index, value)}
              className="flex-1 text-sm text-gray-700"
            />
            <button
              onClick={() => handleRemove(index)}
              className="ml-2 text-red-500 opacity-0 group-hover:opacity-100"
              title="Remove item"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd} className="mt-2 flex">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 text-sm border rounded-l px-2 py-1"
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </form>
    </div>
  );
};

const Section = ({ id, title, description, items, onUpdate, editMode, onOpenDetail }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [localState, setLocalState] = useState({ title, description, items });

  useEffect(() => {
    setLocalState({ title, description, items });
  }, [title, description, items]);

  const handleUpdate = (field, value) => {
    const updated = { ...localState, [field]: value };
    setLocalState(updated);
    onUpdate(updated);
  };

  const handleCardClick = (e) => {
    // Don't open detail view if clicking on edit buttons or inputs
    if (!e.target.closest('button') && !e.target.closest('input') && !e.target.closest('.ql-container')) {
      onOpenDetail(id);
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-3 relative group cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleCardClick}
    >
      {editMode && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => onUpdate(localState)}
            title="Save changes"
          >
            💾
          </button>
        </div>
      )}
      
      <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, ui-sans-serif, system-ui' }}>
        {editMode ? (
          <EditableText
            text={localState.title}
            onSave={(value) => handleUpdate('title', value)}
            className="border-b border-dashed border-gray-300"
          />
        ) : (
          localState.title
        )}
      </h2>
      
      <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
        {editMode ? (
          <EditableText
            text={localState.description}
            onSave={(value) => handleUpdate('description', value)}
            className="border-b border-dashed border-gray-300 w-full"
          />
        ) : (
          localState.description
        )}
      </p>
      
      {editMode ? (
        <EditableList
          items={localState.items}
          onUpdate={(items) => handleUpdate('items', items)}
          className="mt-2"
        />
      ) : (
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
          {localState.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Pathway = ({ title, description, items, onUpdate, editMode }) => {
  const [localState, setLocalState] = useState({ title, description, items });

  useEffect(() => {
    setLocalState({ title, description, items });
  }, [title, description, items]);

  const handleUpdate = (field, value) => {
    const updated = { ...localState, [field]: value };
    setLocalState(updated);
    onUpdate(updated);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-2 relative group">
      {editMode && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => onUpdate(localState)}
            title="Save changes"
          >
            💾
          </button>
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Poppins, ui-sans-serif, system-ui' }}>
        {editMode ? (
          <EditableText
            text={localState.title}
            onSave={(value) => handleUpdate('title', value)}
            className="border-b border-dashed border-gray-300"
          />
        ) : (
          localState.title
        )}
      </h3>
      
      <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
        {editMode ? (
          <EditableText
            text={localState.description}
            onSave={(value) => handleUpdate('description', value)}
            className="border-b border-dashed border-gray-300 w-full"
          />
        ) : (
          localState.description
        )}
      </p>
      
      {editMode ? (
        <EditableList
          items={localState.items}
          onUpdate={(items) => handleUpdate('items', items)}
          className="mt-2"
        />
      ) : (
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
          {localState.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DetailView = ({ content, onClose, onSave, editMode }) => {
  const [editedContent, setEditedContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  if (!content) return null;

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold">{content.title}</h2>
          <div className="flex gap-2">
            {editMode && (
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editedContent.title}
                onChange={(e) => setEditedContent({...editedContent, title: e.target.value})}
                className="w-full text-2xl font-semibold mb-4 p-2 border rounded"
              />
              <ReactQuill
                theme="snow"
                value={editedContent.body}
                onChange={(value) => setEditedContent({...editedContent, body: value})}
                className="h-96 mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.body }} />
          )}
        </div>
      </div>
    </div>
  );
};

const LearningHubPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);
  const [sections, setSections] = useState(() => {
    const savedSections = localStorage.getItem('learningHubSections');
    if (savedSections) {
      return JSON.parse(savedSections);
    }
    return {
      courses: {
        title: 'Courses / Workshops',
        description: 'Organize short courses or workshops on digital twins, data, and tools for your class or lab.',
        items: [
          '1-week bootcamp: Intro to Digital Twins.',
          'Studio workshop: From GIS data to 3D twin.',
          'Guest lecture series with industry partners.'
        ]
      },
      videos: {
        title: 'Video lessons',
        description: 'Curate or embed video explainers that walk through core ideas and example digital twin builds.',
        items: [
          '"What is a Digital Twin?" concept video.',
          'Screen-recorded tutorial building a campus energy map.',
          'Walkthrough of a full student project presentation.'
        ]
      },
      tutorials: {
        title: 'Step-by-step tutorials',
        description: 'Build guided tutorials that students can follow at their own pace, from data import to dashboards.',
        items: [
          'Importing open data into QGIS and cleaning it.',
          'Connecting a live sensor feed to a simple dashboard.',
          'Publishing a web map of a neighborhood twin.'
        ]
      },
      labs: {
        title: 'Hands-on labs',
        description: 'Design labs where students work with real geospatial or sensor data to prototype digital twins.',
        items: [
          'Lab: Measure and map temperatures across a campus.',
          'Lab: Build a small traffic flow simulation for one street.',
          'Lab: Compare baseline vs. retrofitted building energy.'
        ]
      },
      templates: {
        title: 'Student project templates',
        description: 'Provide structured templates for student projects, including goals, data sources, and evaluation.',
        items: [
          'Template: Building energy and comfort twin.',
          'Template: Public space usage and mobility twin.',
          'Template: Environmental monitoring twin for air or water.'
        ]
      },
      caseStudies: {
        title: 'Case Studies',
        description: 'Explore real-world applications of digital twins across different industries and domains.',
        items: [
          'Smart city implementation in Singapore',
          'Predictive maintenance in manufacturing',
          'Healthcare digital twins for patient monitoring'
        ]
      },
      templates: {
        title: 'Student project templates',
        description: 'Provide structured templates for student projects, including goals, data sources, and evaluation.',
        items: [
          'Template: Building energy and comfort twin.',
          'Template: Public space usage and mobility twin.',
          'Template: Environmental monitoring twin for air or water.'
        ]
      },
      caseStudies: {
        title: 'Case Studies',
        description: 'Explore real-world applications of digital twins across different industries and domains.',
        items: [
          'Smart city implementation in Singapore',
          'Predictive maintenance in manufacturing',
          'Healthcare digital twins for patient monitoring'
        ]
      }
    };
  });

  const [pathways, setPathways] = useState({
    gis: {
      title: 'GIS Basics',
      description: 'Learn how maps, layers, and spatial data work so you can bring real-world geography into your twins.',
      items: [
        'Reading shapefiles and GeoJSON.',
        'Understanding coordinate systems.',
        'Making your first styled map of a campus.'
      ]
    },
    python: {
      title: 'Python for geospatial',
      description: 'Use Python libraries (like GeoPandas and raster tools) to clean, join, and analyze spatial datasets.',
      items: [
        'Intro notebook: loading and plotting spatial data.',
        'Joining census and boundary data for a city.',
        'Simple spatial queries (buffers, intersections).'
      ]
    },
    fundamentals: {
      title: 'Digital Twin fundamentals',
      description: 'Connect data, models, and visualization to create twins of buildings, campuses, or cities.',
      items: [
        'Conceptual model: physical system → data → virtual model.',
        'Examples of twins at different scales (room, building, city).',
        'How to scope a realistic student twin project.'
      ]
    },
    ai: {
      title: 'AI for environmental modeling',
      description: 'Apply machine learning to forecast energy use, emissions, or environmental indicators in your twins.',
      items: [
        'Predicting hourly energy consumption from weather data.',
        'Training a simple air quality prediction model.',
        'Comparing baseline vs. intervention scenarios with AI.'
      ]
    }
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedSections = localStorage.getItem('learningHubSections');
    const savedPathways = localStorage.getItem('learningHubPathways');
    
    if (savedSections) setSections(JSON.parse(savedSections));
    if (savedPathways) setPathways(JSON.parse(savedPathways));
  }, []);

  // Save to localStorage when sections or pathways change
  useEffect(() => {
    localStorage.setItem('learningHubSections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('learningHubPathways', JSON.stringify(pathways));
  }, [pathways]);

  const handleSectionUpdate = (sectionKey, updatedSection) => {
    const updatedSections = {
      ...sections,
      [sectionKey]: {
        ...sections[sectionKey],
        ...updatedSection,
        content: sections[sectionKey]?.content || {
          title: updatedSection.title || 'Untitled',
          body: updatedSection.description || '',
          lastUpdated: new Date().toISOString()
        }
      }
    };
    setSections(updatedSections);
  };

  const handleOpenDetail = (sectionKey) => {
    setCurrentDetail({
      type: 'section',
      key: sectionKey,
      content: sections[sectionKey]?.content || {
        title: sections[sectionKey]?.title || 'Untitled',
        body: sections[sectionKey]?.description || '',
        lastUpdated: new Date().toISOString()
      }
    });
  };

  const handleSaveDetail = (updatedContent) => {
    if (!currentDetail) return;
    
    const { type, key } = currentDetail;
    
    if (type === 'section') {
      handleSectionUpdate(key, {
        ...sections[key],
        content: {
          ...updatedContent,
          lastUpdated: new Date().toISOString()
        }
      });
    }
    
    setCurrentDetail(null);
  };

  const handleCloseDetail = () => {
    setCurrentDetail(null);
  };

  const handlePathwayUpdate = (pathwayKey, updatedPathway) => {
    setPathways(prev => ({
      ...prev,
      [pathwayKey]: updatedPathway
    }));
  };

  return (
    <div className="space-y-10 relative p-6">
      {/* Subtle animated gradient background for the page */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 bottom-0 -z-10 opacity-50">
        <div className="h-full w-full bg-gradient-to-br from-sky-200/40 via-emerald-200/40 to-purple-200/40 blur-3xl animate-pulse" />
      </div>

      {/* Header with edit toggle */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, ui-sans-serif, system-ui' }}>
          Learning Hub
        </h1>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`px-4 py-2 rounded-lg ${editMode ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'} hover:opacity-90 transition-opacity`}
        >
          {editMode ? 'Exit Edit Mode' : 'Edit Content'}
        </button>
      </div>

      {/* Sections Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, ui-sans-serif, system-ui' }}>
          Browse Learning Materials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(sections).map(([key, section]) => (
            <Section
              key={key}
              id={key}
              {...section}
              editMode={editMode}
              onUpdate={(updated) => handleSectionUpdate(key, updated)}
              onOpenDetail={() => handleOpenDetail(key)}
            />
          ))}
        </div>
      </section>

      {/* Detail View Modal */}
      {currentDetail && (
        <DetailView
          content={currentDetail.content}
          onClose={handleCloseDetail}
          onSave={handleSaveDetail}
          editMode={editMode}
        />
      )}
    </div>
  );
};

export default LearningHubPage;