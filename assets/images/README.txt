# Commercial Properties - Asset Directory

This directory is prepared for property photographs generated via Google Flow or external imagery.

## Replacement Instructions:
1. Save your property photos into this folder (`assets/images/`).
2. Recommended naming format:
   - `office-01.jpg`, `office-02.jpg`, etc.
   - `retail-01.jpg`, `retail-02.jpg`, etc.
   - `industrial-01.jpg`, `industrial-02.jpg`, etc.
   - `building-01.jpg`, `building-02.jpg`, etc.
   - `hero-commercial.jpg`
3. In `index.html` and other pages, replace the placeholder element:
   ```html
   <!-- Replace this placeholder with the office property image -->
   <div class="property-image-placeholder">
     <div class="placeholder-icon">🏢</div>
     <span>Office Space Image</span>
   </div>
   ```
   with:
   ```html
   <img src="assets/images/office-01.jpg" alt="Commercial Office Space" class="property-image">
   ```
   Or set it as a background image on the container via CSS:
   ```css
   .property-card-image {
     background-image: url('../assets/images/office-01.jpg');
     background-size: cover;
   }
   ```
