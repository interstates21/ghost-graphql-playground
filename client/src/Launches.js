import React from "react";
import gql from "graphql-tag";
import { Table } from "react-bootstrap";
import { Query } from "react-apollo";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      launch_year
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

export const Launches = () => {
  return (
    <Query query={LAUNCHES_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return <h4>Loading ... </h4>;
        }
        if (error) {
          return JSON.stringify(error);
        }

        console.log("data = ", data);
        return <h1>Test</h1>;
      }}
    </Query>
  );
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
};
