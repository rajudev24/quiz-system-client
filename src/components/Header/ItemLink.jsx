import Link from "next/link";

const ItemLink = ({ itemName, url }) => {
  return (
    <div className="mb-2">
      <Link
        className="no-underline text-black text-base font-semibold "
        href={url}
      >
        {itemName}
      </Link>
    </div>
  );
};

export default ItemLink;
