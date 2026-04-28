import React, { useState, useRef } from 'react';

const CustomPrintDesigner = ({ product, onClose, onSaveDesign }) => {
    const [designType, setDesignType] = useState('upload'); // upload, template, text
    const [uploadedImage, setUploadedImage] = useState(null);
    const [customText, setCustomText] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [textColor, setTextColor] = useState('#000000');
    const [fontSize, setFontSize] = useState(24);
    const fileInputRef = useRef(null);

    // Design templates
    const templates = [
        { id: 1, name: 'Heart', emoji: '❤️', design: '❤️' },
        { id: 2, name: 'Star', emoji: '⭐', design: '⭐' },
        { id: 3, name: 'Smile', emoji: '😊', design: '😊' },
        { id: 4, name: 'Cool', emoji: '😎', design: '😎' },
        { id: 5, name: 'Fire', emoji: '🔥', design: '🔥' },
        { id: 6, name: 'Crown', emoji: '👑', design: '👑' },
        { id: 7, name: 'Music', emoji: '🎵', design: '🎵' },
        { id: 8, name: 'Coffee', emoji: '☕', design: '☕' },
    ];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveDesign = () => {
        const designData = {
            type: designType,
            image: uploadedImage,
            text: customText,
            template: selectedTemplate,
            textColor,
            fontSize,
            productId: product.id,
            productName: product.name
        };
        
        onSaveDesign(designData);
        alert('✅ Custom design saved! Added to cart with your custom print.');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', maxHeight: '90vh', overflow: 'auto' }}>
                <div className="modal-header">
                    <h2>🎨 Custom Print Designer</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>

                <div style={{ padding: '20px' }}>
                    <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f8ff', borderRadius: '8px' }}>
                        <strong>Customizing: {product.name}</strong>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                            Create your unique design by uploading an image, choosing a template, or adding custom text
                        </p>
                    </div>

                    {/* Design Type Selector */}
                    <div style={{ marginBottom: '30px' }}>
                        <strong style={{ display: 'block', marginBottom: '15px' }}>Choose Design Type:</strong>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button
                                onClick={() => setDesignType('upload')}
                                style={{
                                    flex: 1,
                                    padding: '15px',
                                    border: `3px solid ${designType === 'upload' ? '#2196f3' : '#ddd'}`,
                                    background: designType === 'upload' ? '#e3f2fd' : 'white',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div style={{ fontSize: '32px', marginBottom: '10px' }}>📤</div>
                                <strong>Upload Image</strong>
                                <p style={{ fontSize: '12px', margin: '5px 0', color: '#666' }}>
                                    Upload your own photo or design
                                </p>
                            </button>

                            <button
                                onClick={() => setDesignType('template')}
                                style={{
                                    flex: 1,
                                    padding: '15px',
                                    border: `3px solid ${designType === 'template' ? '#2196f3' : '#ddd'}`,
                                    background: designType === 'template' ? '#e3f2fd' : 'white',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎨</div>
                                <strong>Design Templates</strong>
                                <p style={{ fontSize: '12px', margin: '5px 0', color: '#666' }}>
                                    Choose from ready-made designs
                                </p>
                            </button>

                            <button
                                onClick={() => setDesignType('text')}
                                style={{
                                    flex: 1,
                                    padding: '15px',
                                    border: `3px solid ${designType === 'text' ? '#2196f3' : '#ddd'}`,
                                    background: designType === 'text' ? '#e3f2fd' : 'white',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div style={{ fontSize: '32px', marginBottom: '10px' }}>✍️</div>
                                <strong>Custom Text</strong>
                                <p style={{ fontSize: '12px', margin: '5px 0', color: '#666' }}>
                                    Add your own text message
                                </p>
                            </button>
                        </div>
                    </div>

                    {/* Upload Image Section */}
                    {designType === 'upload' && (
                        <div style={{ marginBottom: '30px' }}>
                            <strong style={{ display: 'block', marginBottom: '15px' }}>Upload Your Image:</strong>
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            <button
                                onClick={() => fileInputRef.current.click()}
                                style={{
                                    padding: '15px 30px',
                                    background: '#2196f3',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: 'bold'
                                }}
                            >
                                📤 Choose Image (PNG/JPG, Max 5MB)
                            </button>
                            
                            {uploadedImage && (
                                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                    <p style={{ color: '#2d7a3e', marginBottom: '10px' }}>✅ Image uploaded successfully!</p>
                                    <img 
                                        src={uploadedImage} 
                                        alt="Uploaded design" 
                                        style={{ 
                                            maxWidth: '300px', 
                                            maxHeight: '300px', 
                                            border: '2px solid #ddd',
                                            borderRadius: '8px'
                                        }} 
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Design Templates Section */}
                    {designType === 'template' && (
                        <div style={{ marginBottom: '30px' }}>
                            <strong style={{ display: 'block', marginBottom: '15px' }}>Choose a Template:</strong>
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(4, 1fr)', 
                                gap: '15px' 
                            }}>
                                {templates.map(template => (
                                    <button
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template)}
                                        style={{
                                            padding: '20px',
                                            border: `3px solid ${selectedTemplate?.id === template.id ? '#2196f3' : '#ddd'}`,
                                            background: selectedTemplate?.id === template.id ? '#e3f2fd' : 'white',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <div style={{ fontSize: '48px', marginBottom: '10px' }}>
                                            {template.emoji}
                                        </div>
                                        <strong>{template.name}</strong>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Custom Text Section */}
                    {designType === 'text' && (
                        <div style={{ marginBottom: '30px' }}>
                            <strong style={{ display: 'block', marginBottom: '15px' }}>Add Custom Text:</strong>
                            <textarea
                                value={customText}
                                onChange={(e) => setCustomText(e.target.value)}
                                placeholder="Enter your custom text here..."
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    border: '2px solid #ddd',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    minHeight: '100px',
                                    resize: 'vertical'
                                }}
                            />
                            
                            <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '10px' }}>
                                        <strong>Text Color:</strong>
                                    </label>
                                    <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        style={{
                                            width: '100%',
                                            height: '50px',
                                            border: '2px solid #ddd',
                                            borderRadius: '8px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </div>
                                
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '10px' }}>
                                        <strong>Font Size: {fontSize}px</strong>
                                    </label>
                                    <input
                                        type="range"
                                        min="12"
                                        max="72"
                                        value={fontSize}
                                        onChange={(e) => setFontSize(e.target.value)}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>

                            {customText && (
                                <div style={{ 
                                    marginTop: '20px', 
                                    padding: '30px', 
                                    background: '#f5f5f5', 
                                    borderRadius: '8px',
                                    textAlign: 'center'
                                }}>
                                    <p style={{ marginBottom: '10px', color: '#666' }}>Preview:</p>
                                    <div style={{ 
                                        fontSize: `${fontSize}px`, 
                                        color: textColor,
                                        fontWeight: 'bold'
                                    }}>
                                        {customText}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Preview Section */}
                    <div style={{ 
                        marginBottom: '30px', 
                        padding: '30px', 
                        background: '#f9f9f9', 
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <strong style={{ display: 'block', marginBottom: '20px' }}>Design Preview:</strong>
                        <div style={{ 
                            display: 'inline-block',
                            padding: '40px',
                            background: 'white',
                            borderRadius: '8px',
                            border: '2px dashed #ddd',
                            minWidth: '300px',
                            minHeight: '300px',
                            position: 'relative'
                        }}>
                            {designType === 'upload' && uploadedImage && (
                                <img src={uploadedImage} alt="Design" style={{ maxWidth: '250px', maxHeight: '250px' }} />
                            )}
                            {designType === 'template' && selectedTemplate && (
                                <div style={{ fontSize: '120px' }}>{selectedTemplate.emoji}</div>
                            )}
                            {designType === 'text' && customText && (
                                <div style={{ fontSize: `${fontSize}px`, color: textColor, fontWeight: 'bold' }}>
                                    {customText}
                                </div>
                            )}
                            {!uploadedImage && !selectedTemplate && !customText && (
                                <div style={{ color: '#999', padding: '50px' }}>
                                    Your design will appear here
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '15px',
                                background: '#e0e0e0',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveDesign}
                            disabled={!uploadedImage && !selectedTemplate && !customText}
                            style={{
                                flex: 2,
                                padding: '15px',
                                background: (uploadedImage || selectedTemplate || customText) ? '#2d7a3e' : '#ccc',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: (uploadedImage || selectedTemplate || customText) ? 'pointer' : 'not-allowed',
                                fontSize: '16px',
                                fontWeight: 'bold'
                            }}
                        >
                            ✅ Save Design & Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomPrintDesigner;
