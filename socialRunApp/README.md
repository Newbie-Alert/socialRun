
# socialRunApp 🏃‍♂️

**Real-time Running Tracker App (Expo + React Native)**

Tracks GPS during running, visualizes your route on a map, and calculates pace, distance, and calories in real time.

**Goal:** Deliver a complete running experience with live route tracking, real-time stats, and history management.

---

## 1. Core Features

### 🏃‍♀️ Running Session Engine

* Session flow: **idle → running → paused → finished**
* Collects location points at intervals and draws the route as a **polyline**
* Automatically calculates key stats on session finish:

  * **Total distance (m)**
  * **Duration** (ms → min/sec)
  * **Average pace (min/km)**
  * **Calories burned (kcal)**
* All stats appear in the bottom session card

---

### 🗺 Map & Route Visualization

* Built with **react-native-maps**
* Initial region centers on the user’s current location
* Polyline route updates in real time while running
* Planned enhancements:

  * Start/finish markers
  * Pace-based gradient route coloring

---

### ⏱ Timer & Stats Card

* Custom `TimerView` built on top of **react-native-animated-stopwatch-timer**
* Automatically starts, pauses, resets according to session state
* `GradientPlayBox` displays:

  * Timer
  * Total distance
  * Recent segment distance
  * Average pace
  * Calories burned

---

### 🙋‍♂️ Authentication (Initial)

* Login/Signup UI under `(auth)/login`
* `AuthProvider` manages token + user state globally
* `(tabs)/my` screen shows profile info & logout
* Backend integration (Express + MongoDB + JWT) is in progress

---

## 2. Tech Stack

### Frontend

* **Expo + React Native + TypeScript**
* Navigation: **expo-router** (Stack + Tabs)
* Maps: **react-native-maps**
* Architecture:

  * React Context (Auth, Location, Theme)
  * Custom hooks:
    `useRunning`, `useDistance`, `useStopwatch`, `useUserLocation`, `useRunResult`
* UI:

  * **expo-linear-gradient**
  * Custom bottom controller (`GradientPlayBox`)

---

## 3. Folder Structure

```txt
socialRunApp/
  app/
    _layout.tsx              # Global providers & navigation
    index.tsx                # Initial route → Tabs
    (auth)/
      login.tsx
    (tabs)/
      index.tsx              # Main map screen
      feed.tsx
      my.tsx

  components/
    main/
      GradientPlayBox.tsx
      RunningRecord.tsx
    Carousel.tsx
    FloatingButton.tsx
    TimerView.tsx

  hooks/
    useRunning.ts
    useDistance.ts
    useStopwatch.ts
    useUserLocation.ts
    useRunResult.ts

  providers/
    AuthProvider.tsx
    LocationProvider.tsx
    ThemeProvider.tsx

  lib/
    axios/
      index.ts

  api/
    auth/
      auth.api.ts

  utils/
    getDistance.ts
    calcPace.ts
    calcCalories.ts
```

---

## 4. Summary (Upwork-ready)

* Real-time **GPS running tracker**
* Live **polyline route**, distance, pace, calorie stats
* **Context + Custom Hooks** modular architecture
* Authentication layer ready for backend integration
* **MERN-stack compatible** API structure
* Clean, scalable folder structure
* Built with **Expo** → cross-platform iOS/Android

---

# socialRunApp 🏃‍♂️

**실시간 러닝 트래커 앱 (Expo + React Native)**  
달리는 동안 GPS로 내 위치를 추적하고, 지도로 경로를 확인하고, 페이스/거리/칼로리를 계산하는 모바일 앱입니다.

> 목표: **러닝 경로 + 실시간 통계 + 기록 관리**까지 제공하는 러닝 경험 만들기

---

## 1. 주요 기능

### 🏃‍♀️ 러닝 세션

- `대기 → 달리는 중 → 일시정지 → 종료` 상태 관리
- 달리는 동안 일정 간격으로 위치를 수집하고 **polyline** 형태로 경로를 그립니다.
- 러닝 종료 시:
  - 총 거리(m)
  - 소요 시간(ms → UI에 분/초로 표시)
  - 평균 페이스(분/km)
  - 칼로리(kcal)
  위 값들을 하단 카드에 표시합니다.

### 지도 & 경로 시각화

- `react-native-maps`를 사용한 메인 맵 화면
- 현재 위치를 기준으로 초기 Region 설정 (UX 개선)
- 러닝 중에는 polyline으로 경로가 실시간으로 그려집니다.
- 향후:
  - 시작/종료 지점 마커
  - 구간별 색상(페이스별 그라데이션) 등으로 확장 예정

### ⏱ 타이머 & 통계 카드

- `react-native-animated-stopwatch-timer`를 래핑한 `TimerView` 컴포넌트
- 러닝 상태에 따라 자동으로 스타트/일시정지/리셋
- 하단 `GradientPlayBox`에서
  - 실시간 타이머
  - 현재 세션 거리
  - 최근 구간 거리
  - 평균 페이스
  - 소모 칼로리
  를 확인할 수 있습니다.

### 🙋‍♂️ 로그인 / 인증 (초기)
- `(auth)/login.tsx`에서 로그인 & 회원가입 폼 제공
- `AuthProvider`를 통해 token/유저 상태를 전역 관리
- `(tabs)/my.tsx`에서 내 정보와 로그아웃 버튼 제공

> 서버 연동은 Express + MongoDB 기반으로 진행 중이며,  
> JWT 인증과 유저별 러닝 기록 저장을 목표로 하고 있습니다.

---

## 2. 기술 스택

### Frontend

- **Framework:** Expo + React Native + TypeScript
- **Navigation:** expo-router (Stack + Tabs)
- **Maps:** `react-native-maps`
- **State / Logic:**
  - React Context (Auth, Location, Theme)
  - Custom hooks (`useRunning`, `useDistance`, `useStopwatch`, `useUserLocation` 등)
- **UI:**
  - `expo-linear-gradient`
  - 커스텀 하단 러닝 컨트롤 박스 (`GradientPlayBox`)

---

## 3. 폴더 구조

```txt
socialRunApp/
  app/
    _layout.tsx          # 글로벌 Provider 래핑 및 네비게이션 스택
    index.tsx            # 초기 라우트 (탭으로 이동)
    (auth)/
      _layout.tsx
      login.tsx          # 로그인/회원가입 화면
    (tabs)/
      _layout.tsx        # 탭 네비게이션
      index.tsx          # 메인 러닝 맵 화면
      feed.tsx           # 피드 (추가 예정)
      my.tsx             # 내 정보 / 로그아웃

  components/
    main/
      GradientPlayBox.tsx  # 하단 러닝 컨트롤 + 통계 카드
      RunningRecord.tsx    # 거리/페이스/kcal 표시
    Carousel.tsx
    FloatingButton.tsx
    TimerView.tsx

  hooks/
    useRunning.tsx         # 러닝 상태 + 거리/페이스/칼로리 관리
    useDistance.tsx        # 위치 변화 기반 거리 계산
    useStopwatch.tsx       # 러닝 상태와 연동되는 스톱워치
    useUserLocation.tsx    # 현재 사용자 위치 가져오기
    useRunResult.tsx       # 러닝 종료 후 기록 요약용

  providers/
    AuthProvider.tsx       # 로그인/토큰 상태 관리
    LocationProvider.tsx   # watchPositionAsync로 interval 위치 제공
    ThemeProvider.tsx      # 앱 테마/색상 관리

  lib/
    axios/
      index.ts             # API 클라이언트 설정 (baseURL 등)

  api/
    auth/
      auth.api.ts          # 로그인/회원가입 API 호출

  utils/
    getDistance.ts         # 두 좌표 간 거리 계산 (Haversine 등)
    calcPace.tsx           # 페이스 계산 (시간 + 거리 → 분/km 문자열)
    calcCalrories.tsx      # 대략적인 칼로리 계산
```

