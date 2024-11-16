import { FooterProps } from "@/types/footer";
import { Link } from "@nextui-org/react";
import React from "react";

interface LinkGroupProps extends FooterProps {
  dict: any;
}

const LinkGroup: React.FC<LinkGroupProps> = ({
  productTitle,
  productDescription,
  columns,
  dict,
}) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Product Introduction */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-xl text-gray-400 font-bold mb-4">
              {dict.footer[productTitle]}
            </h2>
            <p className="text-gray-400">{dict.footer[productDescription]}</p>
          </div>

          {/* Link Columns */}
          {columns.map((column, index) => (
            <div key={index} className="col-span-1">
              <h3 className="text-lg font-semibold text-gray-400 mb-4">
                {dict.footer[column.title]}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      title={dict.footer[link.title]}
                      color="foreground"
                      underline="hover"
                      className="text-gray-400"
                      rel="follow"
                      isExternal={link.href.startsWith('http')}
                    >
                      {dict.footer[link.name]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkGroup;