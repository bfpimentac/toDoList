import styled from "styled-components";

interface TextProps {
  size?: string;
  align?: string;
  bold?: boolean;
  semiBold?: boolean;
  medium?: boolean;
  regular?: boolean;
  primary?: boolean;
  secondary?: boolean;
  black?: boolean;
  white?: boolean;
  blue?: boolean;
  margin?: string;
  padding?: string;
  width?: string;
  alignSelf?: string;
  opacity?: number;
}

/**
 *  @deprecated Using a custom text component is not recommended as it is not accessible. Screen readers need proper semantic HTML to be able to read the content of the page. Instead, use custom p, h1-h6 tags with the appropriate font size and weight.
 */
export const CustomText = styled.p<TextProps>`
  text-align: ${(props) => props.align || "center"};
  margin: ${(props) => props.margin || "0px"};
  padding: ${(props) => props.padding || "0px"};
  width: ${(props) => props.width || "auto"};
  font-family: ${(props) => (props.secondary ? "Open Sans" : "Outfit")};

  font-weight: ${(props) =>
    (props.bold && 800) ||
    (props.semiBold && 600) ||
    (props.regular && 400) ||
    400};

  font-size: ${(props) =>
    props.size ||
    (props.bold && "20px") ||
    (props.semiBold && "18px") ||
    "16px"};

  color: ${(props) =>
    ({ theme }) =>
      (props.blue && theme.colors.blue) ||
      (props.black && theme.colors.black) ||
      (props.white && theme.colors.white) ||
      theme.colors.black};

  align-self: ${(props) => props.alignSelf || "auto"};
  opacity: ${(props) => props.opacity || 1};
`;
