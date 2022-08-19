/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../utils/colors";

const UserManage = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => ({ ...state.auth }));
  console.log(users);

  return (
    <>
      <MDBTable striped hover>
        {" "}
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {users &&
            users.map((user, idx) => {
              return (
                <>
                  <tr className="text-start">
                    <th scope="row">{idx + 1}</th>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <MDBRow>
                        <MDBCol>
                          <MDBBtn
                            style={{
                              width: 90,
                              marginBottom: 5,
                              backgroundColor: Colors.primary,
                            }}
                          >
                            EDIT
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol>
                          <MDBBtn style={{ backgroundColor: Colors.danger }}>
                            DELETE
                          </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    </td>
                  </tr>
                </>
              );
            })}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default UserManage;
