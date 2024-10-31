import path from "path";
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"

// Translate ESLintRC-style configs into flat configs.
const compat = new FlatCompat({
  baseDirectory: path.resolve(),
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.config({
    parser: "vue-eslint-parser", // Vue 파일에 대해 vue-eslint-parser 사용
    parserOptions: {
      parser: "@typescript-eslint/parser", // Vue 파일 내에서 TypeScript를 지원
      // project: path.resolve(".", "tsconfig.json"),
      tsconfigRootDir: path.resolve(),
      sourceType: "module",
    },
    plugins: ["@typescript-eslint", "vue", "prettier", "nuxt"], // Vue, TypeScript, Prettier 플러그인 사용
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:vue/vue3-recommended", // Vue 3 관련 권장 규칙 적용
      "plugin:prettier/recommended", // Prettier와 통합
    ],
    root: true,
    env: {
      browser: true, // 브라우저 환경 설정
      node: true,
      jest: true,
    },
    ignorePatterns: ["eslint.config.mjs", "dist/**/*", "node_modules", "public/*"], // 무시할 파일 패턴
    rules: {
      "prettier/prettier": "error", // Prettier 문제를 ESLint 오류로 처리
      "vue/multi-word-component-names": "off", // 단일 단어 컴포넌트 이름 허용
      "@typescript-eslint/no-unused-vars": "warn", // 미사용 변수 경고
      "vue/html-self-closing": "off", // 셀프 클로징 태그 규칙 비활성화
      "vue/valid-v-for": "off",
      // "vue/max-attributes-per-line": ["warn", { singleline: 3 }], // Vue 파일의 한 줄에 속성 개수 제한
      semi: ["warn", "always"], // 세미콜론 사용 경고
      "comma-dangle": "off",
      "@typescript-eslint/no-explicit-any": "off", // any 타입 허용
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": "off"
    },
  }),
];