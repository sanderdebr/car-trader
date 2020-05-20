import "../styles/global.css";

export default function App({ Component, ...otherProps }) {
  return <Component {...otherProps} />;
}
