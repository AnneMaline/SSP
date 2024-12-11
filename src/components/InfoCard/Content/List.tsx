import "./Styles.css";

interface ListProps {
  items: string[];
}

const List = ({ items }: ListProps) => {
  return (
    <ul className="custom_list">
      {items.map((item, index) => (
        <li key={index} className="custom_list_item">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default List;
