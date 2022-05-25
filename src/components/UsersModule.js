import { IconButton, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { RegistrationForm } from "./RegistrationForm";
import { LoginForm } from "./LoginForm";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { localStorageUsersKey } from "./constants/index";

const RegistrationFormStyled = styled(RegistrationForm)`
  margin-right: 30px;
`;
const Wrapper = styled("div")`
  display: flex;
`;
const List = styled("ul")`
  list-style: none;
  margin: 0;
  padding: 0;

  & > li {
    margin-bottom: 8px;
    border: 1px solid #aaa;
    padding: 8px;
    display: flex;
  }
`;
export const UsersModule = () => {
  const [token, setToken] = useState();
  const { control } = useForm({
    defaultValues: {
      users: JSON.parse(localStorage.getItem(localStorageUsersKey)) ?? []
    }
  });
  const { fields: users, append, remove } = useFieldArray({
    control,
    name: "users"
  });

  useEffect(() => {
    localStorage.setItem(localStorageUsersKey, JSON.stringify(users));
  }, [users]);

  console.log(token);

  return (
    <Wrapper>
      <div>
        <LoginForm setToken={setToken} />
        <RegistrationFormStyled onUserCreated={append} />
      </div>
      <div>
        <h4>Users</h4>
        <List>
          {users.map((user, index) => (
            <li>
              <span>
                {user.lastName} {user.firstName}
                <IconButton aria-label="delete" onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </span>
            </li>
          ))}
        </List>
      </div>
    </Wrapper>
  );
};
