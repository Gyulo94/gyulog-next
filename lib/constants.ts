import { StylesConfig } from "react-select";

export const APP_NAME = process.env.APP_NAME;
export const APP_DESCRIPTION = process.env.APP_DESCRIPTION;
export const BASE_URL = process.env.BASE_URL;
export const SERVER_URL = process.env.SERVER_URL;

export const category: { title: string; href: string; description: string }[] =
  [
    {
      title: "언어",
      href: "/category/language",
      description: "개발자가 컴퓨터와 소통하는 언어에 대한 이야기",
    },
    {
      title: "프론트엔드",
      href: "/category/frontend",
      description: "프론트 개발자의 핵심적인 이야기",
    },
    {
      title: "백엔드",
      href: "/category/backend",
      description: "백엔드 개발자의 핵심적인 이야기",
    },
    {
      title: "데이터베이스",
      href: "/category/database",
      description: "백엔드 개발자라면 꼭 알아야 할 데이터베이스에 대한 이야기",
    },
    {
      title: "OS",
      href: "/category/os",
      description: "나의 개인 홈 서버에 대한 이야기",
    },
    {
      title: "CS",
      href: "/category/cs",
      description: "IT분야 종사자라면 알아야 할 컴퓨터 과학에 대한 이야기",
    },
    {
      title: "프로젝트",
      href: "/category/project",
      description: "재미삼아 진행하는 프로젝트에 대한 이야기",
    },
    {
      title: "자유로운 글",
      href: "/category/free",
      description: "나의 개인적인 생각을 적는 공간",
    },
  ];

export const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#030712",
    border: state.isFocused ? "1px solid #5D3CEF" : "1px solid #4b5563",
    "&:hover": {
      border: "1px solid #5D3CEF",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#030712",
    border: "1px solid #4b5563",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#030712"
      : state.isFocused
      ? "#030712"
      : "#030712",
    color: state.isSelected ? "#fff" : "#d1d5db",
    "&:hover": {
      backgroundColor: "#5D3CEF",
      cursor: "pointer",
      color: "#fff",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  multiValue: (provided) => ({
    ...provided,
    color: "#fff",
    backgroundColor: "#5D3CEF",
  }),
};
