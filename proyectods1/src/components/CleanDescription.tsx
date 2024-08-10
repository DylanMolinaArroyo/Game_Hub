interface Props {
  description: string;
}

const CleanDescription = ({ description }: Props) => {
  return description
    .replace(/<\/?p>/g, "\n\n")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<\/?[^>]+(>|$)/g, "");
};

export default CleanDescription;
