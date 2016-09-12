import hasFlag from 'has-flag';
import findupNodeModules from 'findup-node-modules';

const host  = 'log.dev';
const src   = './src';
const dest  = './dist';
const test  = './test';
const debug = hasFlag('debug');

export default {
  src,
  dest,
  environment: {
    debug
  },
  sass: {
    src: src + '/styles/**/*.{sass,scss}',
    dest: dest + '/styles',
    settings: {
      sourceComments: debug ? 'map' : null,
      imagePath: 'public/images',
      includePaths: []
    }
  },
  autoprefixer: {
    browsers: ['last 2 versions']
  },
  fonts: {
    src: src + '/fonts/**/*.{ttf,woff,woff2}',
    out: 'fonts.css',
    dest,
  },
  images: {
    src: [
      src + '/images/**',
      '!' + src + '/images/svg-sprite'
    ],
    dest: dest + '/images',
    settings: {
      svgoPlugins: [
        {
          cleanupIDs: false
        },
        {
          removeUnknownsAndDefaults: {
            SVGid: false
          }
        }
      ]
    }
  },
  svgSpriteSrc: 'svg-sprite/**/*.svg',
  svgSprite: {
    svg: {
      rootAttributes: {
        height: 0,
        width:  0,
        style:  'position: absolute'
      }
    },
    mode: {
      inline: true,
      symbol: {
        dest: '',
        sprite: 'sprite.svg'
      }
    }
  },
  eslint: {
    src: src + '/scripts/**/*.{js,jsx}'
  },
  phpunit: {
    watch: '/**/*.php',
    src: test + '/phpunit/**/*.test.php'
  },
  ava: {
    src: test + '/ava/**/*.js'
  },
  browserSync: {
    proxy: host,
    files: [
      '*.css',
      '**/*.php',
      dest + '/**',
      '!**/*.map',
      '!' + test + '/**/*.php'
    ]
  },
  browserify: {
    debug: debug,
    extensions: ['.jsx', '.yaml', '.json', '.hbs', '.dust'],
    bundleConfigs: [
      {
        entries: src + '/scripts/app.js',
        dest + '/scripts',
        outputName: 'app.js',
        vendor: false
      }, {
        dest + '/scripts',
        outputName: 'infrastructure.js',
        vendor: true
      }, {
        entries: src + '/scripts/head.js',
        dest + '/scripts',
        outputName: 'head.js'
      }, {
        entries: src + '/scripts/inline.js',
        dest + '/scripts',
        outputName: 'inline.js'
      }, {
        entries: src + '/scripts/admin.js',
        dest + '/scripts',
        outputName: 'admin.js'
      }
    ]
  }
};
