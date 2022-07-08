// 详情地址：https://ice.work/docs/config/about/#compiledependencies-
import legacy from '@vitejs/plugin-legacy';
import OptimizationPersist from 'vite-plugin-optimize-persist'; // 动态分析依赖优化
import PkgConfig from 'vite-plugin-package-config';

// const this_api = api地址;

export default {
  hash: process.env.NODE_ENV === 'production',
  plugins: [['build-plugin-antd', { disableModularImport: true }]], // build-plugin-antd定制组件主题
  alias: {
    utils: './src/utils', // 配置{ "@": "./src/" } 的规则
  },
  define: {
    APP_VERSION: '0.1.0', // 配置全局变量
  },
  // proxy: {
  //   '/pe-api/mock/': {
  //     enable: true,
  //     target: apis.mock,
  //     changeOrigin: true,
  //     pathRewrite: { '^/pe-api/mock/': '/' },
  //   },
  //   '/pe-api/local-mock/': {
  //     enable: true,
  //     target: apis.local_mock,
  //   },
  //   '/pe-api': {
  //     enable: true,
  //     target: this_api,
  //     changeOrigin: true,
  //     pathRewrite: { '^/pe-api': '/' },
  //   },
  // },
  compileDependencies: ['moment/locale/zh-cn'],
  modeConfig: {
    // 平台差异化配置 https://ice.work/docs/guide/basic/config/#%E5%8C%BA%E5%88%86%E5%B7%A5%E7%A8%8B%E9%85%8D%E7%BD%AE
    vite: {
      vite: {
        esbuild: {
          logOverride: { 'this-is-undefined-in-esm': 'silent' }, // 为了修复esbuild从 v0.14.44 版本更改为 v0.14.45 后，使用 Vite 运行 React 应用程序已经开始产生上述错误
        },
      },
      vitePlugins: [
        PkgConfig(),
        OptimizationPersist(),
        legacy({
          targets: ['defaults', 'not IE 11'],
        }),
      ],

      publicPath: '/ice-demo/',
      outputDir: 'docs',
      // optimizeDeps: {
      //   // include: ['moment/locale/zh-cn'],
      // },
    },
    webpack: {
      // remoteRuntime: true,
      // 和babel二选一
      // swc: {
      //   jsc: {
      //     transform: {
      //       react: {
      //         runtime: 'automatic',
      //       },
      //     },
      //   },
      // },
      // outputDir: 'dist_webpack',
      publicPath: '/ice-demo/',
      outputDir: 'docs',
      babelPresets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
    },
  },
};
