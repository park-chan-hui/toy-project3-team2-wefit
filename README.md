# TEAM2 - 당신과는 차찬희

## 🏃프로젝트 소개

![thumbnail](https://github.com/user-attachments/assets/2664eabb-1ccf-4a2a-99a7-aa54af6c7482)

### 당신의 운동 파트너 WeFit: 운동 영상을 저장하고 공유하며 소통하는 피트니스 플랫폼입니다.

> **We + Fitness: 우리는 항상 함께 운동한다**는 의미를 담은 서비스명입니다❗️

&nbsp;

## 🔧 기술 스택

<div align="center">

|       Type       |                                                                                                           Tool                                                                                                           |
| :--------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     Library      |   ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)   |
|     Language     |                                                 ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)                                                 |
|     Styling      |                                               ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)                                               |
|       BaaS       |                                                       ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)                                                        |
| State Management |                                                             ![Zustand](https://img.shields.io/badge/🐻%20Zustand-81c147?style=for-the-badge&logoColor=white)                                                             |
|  Data Fetching   |                                                ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)                                                 |
|    Formatting    | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black) |
| Package Manager  |                                                           ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)                                                            |
| Version Control  |     ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)     |
|  Collaboration   |     ![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)      |

</div>

&nbsp;

## 🌱 프로젝트 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/Dev-FE-2/toy-project3-team2-wefit.git
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

실행 후 `http://localhost:5173`에서 확인 가능합니다.

&nbsp;

## 🍀 우리의 컨벤션

### 폴더 구조

```bash
📋 src
    ├─📁 api             # 파일명: PascalCase
    ├─📁 assets          # 폴더명: kebab-case
    ├─📁 components
    │  ├─📂 auth
    │  ├─📂 author
    │  ├─📂 bookmark
    │  ├─📂 comment
    │  ├─📂 common
    │  ├─📂 empty
    │  ├─📂 header
    │  ├─📂 my-page
    │  ├─📂 navigation-bar
    │  ├─📂 playlist
    │  ├─📂 skeleton
    │  ├─📂 thumbnail
    │  └─📂 video
    ├─📁 constants
    ├─📁 hooks
    ├─📁 layout
    ├─📁 mocks
    ├─📁 pages
    ├─📁 routes
    ├─📁 schema
    ├─📁 store
    ├─📁 styles
    ├─📁 types
    └─📁 utils
```

### 코드 스타일

```js
// 함수
const ComponentName = () => { ... }

// 변수
const userInput = '...'    // camelCase
const API_KEY = '...'      // UPPER_SNAKE_CASE
```

### 커밋 컨벤션

```bash
feat: 새로운 기능 추가
style: css 수정 및 코드의 의미에 영향을 미치지 않는 변경사항
fix: 버그 수정
refactor: 리팩토링, 기능 변화 없이 코드 구조 개선
chore: 코드 수정 외 잡다한 작업 (빌드 과정이나 설정 변경 등)
docs: 문서 변경
test: 테스트 코드 추가 또는 수정
revert: 이전 커밋을 되돌림
```

### 브랜치 전략

```bash
main (배포용)
  │
  └── develop (개발용 main)
        │
        ├── feat/video-fetch-15    # 기능별 브랜치
        ├── feat/user-auth-22
        └── feat/api-integration-39
```

- **main**: 배포 준비가 완료된 코드만 관리
- **develop**: 개발 중인 코드의 중심 브랜치
- **feat/\***: 기능별 독립 개발 환경
  - 네이밍: feat/기능-세부기능-이슈번호
  - 예시: feat/video-fetch-15

### 품질 관리

- **ESLint**: 정적 코드 분석을 통해 잠재적 문제를 감지하고 일관된 코드 품질을 보장합니다.
- **Prettier**: 개발자가 작성한 코드를 자동으로 포맷팅하여 프로젝트 전반에 걸쳐 일관된 코드 스타일을 유지합니다.
- **Commitlint**: 커밋 메시지가 정해진 규칙을 따르도록 검사하여 명확하고 일관된 커밋 히스토리를 관리합니다.
- **Husky**: Git Hooks를 통해 커밋 전 린트 검사, 푸시 전 테스트 실행 등 자동화된 품질 검사를 수행합니다.

&nbsp;

## 📆 프로젝트 진행 과정

### 기획 (2024.12.30 ~ 2024.12.31)

프로젝트의 방향성을 설정하고 핵심 기능을 정의하는 시간을 가졌습니다. 팀원들과 함께 요구사항 명세서를 작성하고 서비스 플로우를 구체화했습니다.

### [와이어프레임](https://www.figma.com/design/CdSSQdaagqRFuvf9uXjnVu/%EB%8B%B9%EC%8B%A0%EA%B3%BC%EB%8A%94-%EC%B0%A8%EC%B0%AC%ED%9D%AC?node-id=0-1&p=f) 제작 (2025.01.02 ~ 2025.01.05)

정의된 기능 명세를 바탕으로 Figma를 활용하여 와이어프레임을 제작했습니다. 프로젝트의 일관성을 위해 디자인 시스템을 구축하고 컴포넌트를 설계했습니다.

### 개발 및 퍼블리싱 (2025.01.06 ~ 2025.01.11)

설계된 와이어프레임을 기반으로 핵심 기능을 구현했습니다. 재사용 가능한 UI 컴포넌트들을 직접 설계하고 개발한 후, 세부 기능을 단계적으로 구현했습니다. 매일 아침 데일리 스크럼을 통해 진행 상황을 공유하고, 팀원 간 적극적인 코드 리뷰를 진행했습니다.

### Supabase 연동 (2025.01.12 ~ 2025.01.17)

Supabase를 BaaS(Backend as a Service)로 도입하여 내장 메서드를 활용한 API를 설계했습니다. 이를 TanStack Query와 연동해 효율적인 데이터 페칭과 상태 관리를 구현했습니다.

### 리팩토링 (2025.01.20 ~ 2025.01.22)

코드 품질 향상을 위한 리팩토링을 진행했고, 컴포넌트 분리 및 발견된 버그를 수정했습니다.

&nbsp;

## 📊 데이터 구조

![image](https://github.com/user-attachments/assets/01e19a7f-fadc-41d1-bb05-6288e28962c9)

[DBDiagram](https://dbdiagram.io/d/67738f5c5406798ef7f9a07b)을 활용해 초기 데이터베이스를 설계했으며, 개발 과정에서 필요한 테이블 구조 변경은 Supabase 대시보드에서 실시간으로 반영했습니다.

&nbsp;

## 🚀 주요 기능

### 소셜 로그인

- 번거로운 회원가입 절차 없이 소셜 미디어 계정을 통해 즉시 서비스에 접근할 수 있습니다.
- 이를 통해 사용자의 진입 장벽을 낮추고 서비스 접근성을 크게 향상시켰습니다.

### 메인 페이지

- 가슴, 등, 어깨 등 다양한 카테고리의 영상을 무한 스크롤로 탐색할 수 있습니다. 스크롤이 하단에 도달할 때마다 새로운 컨텐츠가 자동으로 로드됩니다.
- 신체 부위별 필터링을 통해 사용자가 원하는 운동 영상을 쉽게 찾을 수 있습니다.

### 영상 상세 페이지

- 유튜브 영상을 별도의 앱 전환 없이 애플리케이션 내에서 바로 시청할 수 있습니다. 임베디드 플레이어를 통해 끊김 없는 시청 경험을 제공합니다.
- 마음에 드는 영상은 좋아요를 누르거나 북마크에 저장하여 나중에 다시 찾아볼 수 있습니다.
- 영상에 대한 생각과 경험을 댓글로 공유할 수 있으며, 다른 사용자의 댓글에 대댓글을 작성하여 활발한 소통이 가능합니다.
- 본인이 작성한 댓글은 언제든지 삭제할 수 있습니다.

### 작성자 상세 페이지

- 작성자에 대해서 팔로우를 할 수 있는 기능이 있습니다.
- 작성자가 업로드한 모든 영상을 최신순 또는 인기순으로 정렬하여 확인할 수 있습니다.

### 북마크 페이지

- 관심 있는 영상을 북마크에 추가하고 카테고리별로 체계적으로 관리할 수 있습니다.
- 저장된 영상들을 카테고리별로 그룹화를 통해 플레이리스트로 시청할 수 있습니다.

### 플레이리스트 페이지

- 북마크 카테고리별로 생성된 플레이리스트를 한눈에 확인하고 관리할 수 있습니다.
- 각 플레이리스트의 상세 페이지에서 영상 순서 변경, 영상 추가/제거 등 자유로운 커스터마이징이 가능합니다.
- 더 이상 필요 없는 플레이리스트는 삭제할 수 있으며, 이는 연결된 북마크 카테고리도 함께 삭제됩니다.
- `react-beautiful-dnd` 라이브러리를 활용한 직관적인 드래그 앤 드롭 인터페이스로 영상 순서를 손쉽게 조정할 수 있습니다.

### 영상 추가 페이지

- 유튜브 URL만으로 손쉽게 영상을 임베드하여 미리보기할 수 있습니다.
- 영상 제목, 관련 해시태그, 대표 썸네일을 설정해 영상 업로드가 가능합니다.

### 마이 페이지

- 상단의 로그아웃 버튼으로 간편하게 로그아웃할 수 있으며, 소셜 로그인 토큰이 자동으로 삭제됩니다.
- 프로필 수정 기능을 통해 사용자 정보를 언제든지 업데이트할 수 있습니다.
- 내가 좋아요한 영상 목록, 직접 업로드한 영상 목록, 작성한 댓글 히스토리 등 나의 활동 내역을 한눈에 확인할 수 있습니다.

&nbsp;

## 🏃 당신과는 차찬희

|     [![park-chan-hui](https://avatars.githubusercontent.com/u/176368439?v=4)](https://github.com/park-chan-hui)     |                                     [![bbjbc](https://avatars.githubusercontent.com/u/102457140?v=4)](http://github.com/bbjbc)                                     |        [![Chajaesik01](https://avatars.githubusercontent.com/u/127061507?v=4)](http://github.com/Chajaesik01)        |
| :-----------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: |
|                                  **💪 [박찬희](https://github.com/park-chan-hui)**                                  |                                                             **💪 [조병찬](https://github.com/bbjbc)**                                                              |                                    **💪 [차재식](http://github.com/Chajaesik01)**                                    |
| 공통 컴포넌트 제작 <br /> 마이페이지, 영상 업로드 및 수정, 프로필 수정 <br /> 내가 업로드한 동영상 퍼블리싱 및 개발 | 개발 환경 구축, 공통 컴포넌트 제작 <br /> supabase 소셜 로그인 연동, 로그인 페이지 <br /> 메인 페이지, 영상 상세 페이지 <br /> 작성자 상세 페이지 퍼블리싱 및 개발 | 디자인 토큰 세팅, 공통 컴포넌트 제작 <br /> 북마크 페이지, 드래그 & 드롭 <br /> 플레이리스트 페이지 퍼블리싱 및 개발 |
