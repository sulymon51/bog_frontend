import React, {  useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import Spinner from '../../../layouts/Spinner';
import { getUsers } from '../../../../redux/actions/UserAction';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight, FaFileDownload } from "react-icons/fa";
import { useTable, useGlobalFilter, useAsyncDebounce, useFilters, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useExportData } from "react-table-plugins";
import Papa from "papaparse";
import * as XLSX from 'xlsx'


// export table files

function getExportFileBlob({ columns, data, fileType, fileName }) {
  if (fileType === "csv") {
    // CSV example
    const headerNames = columns // eslint-disable-next-line
      .filter((c) => c.Header != "Action")
      .map((col) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: "text/csv" });
  } else if (fileType === "xlsx") {
    // XLSX example

    const header = columns // eslint-disable-next-line
      .filter((c) => c.Header != "Action")
      .map((c) => c.exportValue);
    const compatibleData = data.map((row) => {
      const obj = {};
      header.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });

    let wb = XLSX.utils.book_new();
    let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
      header
    });
    XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
    XLSX.writeFile(wb, `${fileName}.xlsx`);

    // Returning false as downloading of file is already taken care of
    return false;
  }
  //PDF example
  if (fileType === "pdf") {
    const headerNames = columns // eslint-disable-next-line
      .filter((c) => c.Header != "Action")
      .map((column) => column.exportValue);
    const doc = new jsPDF();
    doc.autoTable({
      head: [headerNames],
      body: data,
      styles: {
        minCellHeight: 9,
        halign: "left",
        valign: "center",
        fontSize: 11
      }
    });
    doc.save(`${fileName}.pdf`);

    return false;
  }

  // Other formats goes here
  return false;
}


export function UsersTable({status, userType}){

  const dispatch = useDispatch()
  // const isLoading = useSelector((state) => state.users.isLoading);

  useEffect (() => {

    dispatch(getUsers())
      
  }, [dispatch]) 

  let userDatas = useSelector((state) => state.users.users);
  let users = userDatas?.map(data => data.user)

    if (userType) {
        users = users.filter(where => where.userType === userType)
    }
    if (status) {
      users = users.filter(where => where.status === status)
    }
    const navigate = useNavigate()
    const gotoDetailsPage = (id) => {
        navigate(`/dashboard/userdetails?userId=${id}`)
    }

    const formatStatus = (status) => {
      switch (status) {
          case "isAcive":
              return <p className="px-2 py-1 text-blue-700 bg-blue-100 w-24 rounded-md fw-600">Active</p>
          

          default: return <p className="px-2 py-1 text-orange-700 bg-orange-100 w-24 rounded-md fw-600">Inactive</p>
      }

  }
  const formatType = (userType) => {
    switch (userType) {
        case "private_client":
            return <p>Private Client</p>
        case "corporate_client":
          return <p>Corporate Client</p>
        case "vendor":
          return <p>Product Partner</p>
        case "professional":
          return <p>Service Partner</p>

        default: return userType
    }

}


    const columns = useMemo(
        () => [
          {
            Header: 'S/N',
            accessor: ( row, index) => index + 1  //RDT provides index by default
          },
          {
            Header: "Full Name",
            accessor: "name",
          },
          {
            Header: "Email",
            accessor: "email",
            
          },
          {
            Header: "Phone Number",
            accessor: "phone",
          },
          {
            Header: "Client Type",
            accessor:  'userType',
            // Filter: SelectColumnFilter, 
            // filter: 'includes',
            Cell: (props) => formatType(props.value)
            
          },
          {
            Header: "Status",
            accessor: "isActive",
            Cell: (props) => formatStatus(props.value)
          },
          {
            Header: 'Action',
            accessor: 'id',
            Cell: (row) => <Menu placement="left-start" className="w-16">
                              <MenuHandler>
                                <Button className="border-none bg-transparent shadow-none hover:shadow-none text-black"><button className="lg:text-xl"><BsThreeDotsVertical /></button></Button>
                              </MenuHandler>
                              <MenuList className="w-16 bg-gray-100 fw-600 text-black">
                                <MenuItem onClick={() => gotoDetailsPage(row.value)}>View Details</MenuItem>
                                <MenuItem></MenuItem>
                                <MenuItem className="bg-red-600 text-white">Block User</MenuItem>
                              </MenuList>
                            </Menu>,
          },
        ], // eslint-disable-next-line 
        [] 
      );

    
      const data = useMemo(() => users, [users]);
    
      return (
        <>
          <div className="overflow-hidden px-4 bg-white py-8 rounded-md">
            <Table columns={columns} data={data}  className=""/>
          </div>
        </>
      );

}

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <div className="flex items-center h-9 overflow-hidden  lg:w-64  rounded-md">
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          className="px-2 py-1 h-full border-2 border-gray-400 rounded-l-md w-10/12  outline-none"
        />
        <p className="w-2/12 h-full center-item rounded-r-md bg-primary "><FontAwesomeIcon icon={faSearch} className="text-xl py-1 rounded-r-md bg-primary text-white text-center"/></p>
      </div>
    )
  }

const Table = ({columns, data}) => {

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, state, preGlobalFilteredRows, setGlobalFilter, page, canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize, exportData } =
    useTable({
      columns,
      data,
      getExportFileBlob,
    }, 
    useFilters,
    useGlobalFilter, usePagination, useExportData );

    

    return (
        <>
            <div className="flex items-center mb-5 justify-between">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                <div className="flex">
                  <Menu>
                    <MenuHandler>
                      <Button className="p-0 m-0 bg-transparent shadow-none text-blue-800 hover:shadow-none"><FaFileDownload className="text-2xl"/></Button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem onClick={() => {
                          exportData("csv", true);
                        }}>
                          Export as CSV
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          exportData("xlsx", true);
                        }}>
                          Export as Excel
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          exportData("pdf", true);
                        }}>
                          Export as PDF 
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  {headerGroups.map((headerGroup) =>
                      headerGroup.headers.map((column) =>
                      column.Filter ? (
                          <div className="fs-500 px-3 py-2 rounded-md bg-light" key={column.id}>
                              <label for={column.id} className="fw-600 ">{column.render("Header")}: </label>
                              {column.render("Filter")}
                          </div>
                      ) : null
                      )
                  )}
                </div>                
                
            </div>
        <div className="mt-2 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-gray-200 sm:rounded-lg">
                        <table {...getTableProps()} className="items-center w-full bg-transparent border-collapse">
                            <thead className="thead-light bg-light">
                                {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                    <th 
                                    scope="col"
                                    className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left"
                                    {...column.getHeaderProps()}>{column.render("Header")}</th>
                                    ))}
                                </tr>
                                ))}
                            </thead>
                            <tbody
                                className="bg-white"
                                {...getTableBodyProps()}>
                                {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr 
                                        {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-4 text-left" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                    })}
                                    </tr>
                                );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div className="pagination mt-8 flex justify-between items-center">
            <div>
                <span>
                Page{' '}
                <strong>
                    {state.pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
                </span>
                <select
                value={state.pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
                >
                {[5, 10, 20].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                    </option>
                ))}
                </select>
            </div>
            <div>
                <button className="border border-gray-400 px-2 p-1 text-xl" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <FaAngleDoubleLeft/>
                </button>{' '}
                <button className="border border-gray-400 px-2 p-1 text-xl" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <FaAngleLeft/>
                </button>{' '}
                <button className="border border-gray-400 px-2 p-1 text-xl" onClick={() => nextPage()} disabled={!canNextPage}>
                    <FaAngleRight/>
                </button>{' '}
                <button className="border border-gray-400 px-2 p-1 text-xl" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <FaAngleDoubleRight/>
                </button>
            </div>
        </div>
        </>
      );
}

// dropdown filter for table

export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);
  
    // Render a multi-select box
    return (
      <select
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        className="bg-light outline-none"
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }