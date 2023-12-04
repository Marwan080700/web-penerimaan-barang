import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser, userSelectors } from "../../redux/slice/user";
import { useEffect, useRef, useState } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import ModifyUser from "../../components/atoms/button/modify/modify-user";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.selectAll);
  const [enableSelection, setEnableSelection] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUser, setFilteredUser] = useState([]);
  const [searchText, setSearchText] = useState("");
  const gridRef = useRef(null);
  const gridStyle = { minHeight: 200 };

  const column = [
    {
      name: "username",
      header: "Username",
      minWidth: 50,
      defaultFlex: 2,
    },
    {
      name: "name",
      header: "Name",
      maxWidth: 1000,
      defaultFlex: 1,
    },
    {
      name: "role",
      header: "Role",
      maxWidth: 1000,
      defaultFlex: 1,
    },
    {
      name: "status",
      header: "Status",
      maxWidth: 1000,
      defaultFlex: 1,
    },
  ];

  const handleUserRowClick = (row) => {
    setSelectedUser(row);
  };

  const onSearchChange = ({ target: { value } }) => {
    const visibleColumns = gridRef.current?.visibleColumns || [];

    setSearchText(value);

    const newDataSource = user.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + "").toLowerCase();
        return acc || v.indexOf(value.toLowerCase()) !== -1;
      }, false);
    });

    // Update the local state with the filtered data
    dispatch(getUser(newDataSource));
  };

  const handleUpdate = async (formData, selectedUserId) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    await dispatch(
      updateUser({
        id: selectedUserId,
        formData,
        config,
      })
    ).then(() => {
      console.log("Product category updated!");
      dispatch(getUser());
    });
  };

  useEffect(() => {
    const filteredUser = user.filter((p) => {
      const values = Object.values(p).map((value) =>
        (value + "").toLowerCase()
      );
      return values.some((v) => v.includes(searchText.toLowerCase()));
    });
    setFilteredUser(filteredUser);
  }, [user, searchText]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      <div className="border-b border-gray-200 mb-6 uppercase text-sm font-bold py-3">
        <h2>User</h2>
      </div>
      <div className="mb-10">
        <div className="flex justify-between items-center uppercase text-xs font-semibold mb-2">
          <h3>User List</h3>
          <div className="flex justify-center items-center gap-2">
            <input
              type="text"
              className="border rounded w-10rem] h-[2rem] px-2"
              placeholder="Cari data..."
              value={searchText}
              onChange={onSearchChange}
            />
            <ModifyUser
              selectedUser={selectedUser}
              // trigger={trigger}
              // setTrigger={setTrigger}
              // selectedCategory={selectedCategory?.data}
              // handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          </div>
        </div>
        <div className="relative hover:z-50">
          <ReactDataGrid
            idProperty="id"
            columns={column}
            dataSource={filteredUser ?? []}
            style={gridStyle}
            pagination
            onRowClick={handleUserRowClick}
            enableSelection={enableSelection}
          />
        </div>
      </div>
    </div>
  );
};
export default User;
