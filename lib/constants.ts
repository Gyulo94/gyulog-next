export const APP_NAME = "Gyulog";
export const APP_DESCRIPTION = "찰규의 숨겨진 블로그입니다.";
export const BASE_URL = "http://localhost:3000";
export const SERVER_URL = "http://localhost:8000";

export const category: { title: string; href: string; description: string }[] =
  [
    {
      title: "언어",
      href: "/category/language",
      description: "컴퓨터와 소통하기 위한 언어.",
    },
    {
      title: "프론트엔드",
      href: "/category/frontend",
      description: "웹 애플리케이션의 사용자 인터페이스를 구성하는 파트.",
    },
    {
      title: "백엔드",
      href: "/category/backend",
      description:
        "웹 애플리케이션의 서버, 데이터베이스, 애플리케이션 로직 등을 포함하여 클라이언트와의 상호작용을 지원하는 파트.",
    },
    {
      title: "데이터베이스",
      href: "/category/database",
      description:
        "데이터를 체계적으로 저장하고 관리하여 효율적인 검색과 처리를 가능하게 하는 시스템.",
    },
    {
      title: "OS",
      href: "/category/os",
      description:
        "컴퓨터 자원을 관리하고 사용자와 프로그램이 시스템을 효율적으로 사용할 수 있도록 지원하는 소프트웨어.",
    },
    {
      title: "CS",
      href: "/category/cs",
      description:
        "컴퓨터와 정보 시스템의 이론, 개발, 응용을 연구하는 학문 분야.",
    },
    {
      title: "자유로운 글",
      href: "/category/free",
      description: "개인의 생각이나 감정을 제약 없이 표현하는 글.",
    },
  ];
