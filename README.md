# ARtisan - Discover Local Art Across India

A modern marketplace connecting art lovers with India's finest local artisans, featuring Augmented Reality visualization.

## Features

- 🎨 **Discover Regional Treasures**: Browse authentic handicrafts from across India
- 📱 **Augmented Reality**: Visualize products in your own space before buying
- 🗺️ **Location-Based Discovery**: Find artisans in your city or explore different states
- 💬 **Direct Communication**: Chat with artisans about their work
- 🚚 **Pan-India Shipping**: Reliable delivery across the country
- 🏛️ **Cultural Heritage**: Learn about art forms and their history

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Vercel

## Live Demo

🌐 **[View Live Site](https://your-deployment-url.vercel.app)**

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/StarTecq/ARtisan-web.git
   cd ARtisan-web
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 3000
   
   # Using Node.js http-server
   npx http-server . -p 3000
   ```

3. Visit `http://localhost:3000`

## Deployment

### Deploy to AWS (Recommended)

#### Option 1: AWS Amplify (Easiest)
1. **Push your code to GitHub**
2. **Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)**
3. **Connect your GitHub repository**
4. **Deploy automatically**

#### Option 2: AWS S3 + CloudFront (Most Cost-Effective)

**Prerequisites:**
- Install [AWS CLI](https://aws.amazon.com/cli/)
- Configure AWS credentials: `aws configure`

**Quick Deploy:**
```bash
# Make script executable
chmod +x deploy-aws.sh

# Deploy to S3
./deploy-aws.sh
```

**Full Infrastructure Setup:**
```bash
# Create complete AWS infrastructure (S3 + CloudFront)
npm run aws:create-stack

# Deploy your files
npm run deploy:aws
```

### Deploy to Vercel (Alternative)

1. **Via GitHub (Recommended)**:
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Deploy automatically

2. **Via Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel
   ```

## Project Structure

```
artisan-web/
├── index.html              # Main HTML file
├── styles.css              # Custom CSS styles
├── script.js               # JavaScript functionality
├── package.json            # Project metadata
├── README.md              # This file
├── vercel.json            # Vercel deployment config
├── amplify.yml            # AWS Amplify build config
├── aws-infrastructure.json # CloudFormation template
└── deploy-aws.sh          # AWS deployment script
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Made with ♥ for Indian Artisans Everywhere**
