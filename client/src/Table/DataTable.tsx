import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Input,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { addUser, editUser, deleteUser } from '../redux/sliceData';
import { fetchData } from '../redux/dataActions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { User, UserKeys } from '../types';

export default function DataTable() {
  const data: User[] = useAppSelector((store) => store.sliceData.info);
  const isLoading = useAppSelector((store) => store.sliceData.isLoading);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const [sortColumn, setSortColumn] = useState('');
  const [isSortDesc, setIsSortDesc] = useState(false);

  useEffect(() => {
    void dispatch(fetchData());
  }, [dispatch]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    setLoginError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleEdit = (userId: number) => {
    const userToEdit = data.find((user) => user.id === userId);
    if (userToEdit) {
      setLogin(userToEdit.name);
      setEmail(userToEdit.email);
      setEditingUserId(userId);
    }
  };

  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setIsSortDesc(!isSortDesc);
    } else {
      setSortColumn(column);
      setIsSortDesc(false);
    }
  };

  const sortedData = [...data];

  if (sortColumn) {
    sortedData.sort((a, b) => {
      const key = sortColumn as UserKeys;
      if (a[key] < b[key]) {
        return isSortDesc ? 1 : -1;
      }
      if (a[key] > b[key]) {
        return isSortDesc ? -1 : 1;
      }
      return 0;
    });
  }

  const handleSubmit = () => {
    if (!login) {
      setLoginError('Поле "Login" обязательное');
      return;
    }
    if (!email) {
      setEmailError('Поле "Email" обязательное');
      return;
    } else if (!isValidEmail(email)) {
      setEmailError(
        'Поле "Email" должно быть валидным адресом электронной почты'
      );
      return;
    }

    if (editingUserId !== null) {
      dispatch(editUser({ editingUserId, login, email }));
      setEditingUserId(null);
    } else {
      const newUser: User = {
        id: data.length + 1,
        name: login,
        email,
        address: {
          city: '',
          street: '',
          suite: '',
        },
        website: '',
        company: {
          name: '',
        },
      };

      dispatch(addUser(newUser));
    }

    setLogin('');
    setEmail('');
  };

  const isValidEmail = (value: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zAZ.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(value);
  };

  return (
    <>
      {isLoading ? (
        <div>Загрузка</div>
      ) : (
        <VStack spacing={4}>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th onClick={() => handleSort('name')}>Name</Th>
                <Th onClick={() => handleSort('email')}>Email</Th>
                <Th onClick={() => handleSort('address.street')}>Address</Th>
                <Th onClick={() => handleSort('website')}>Website</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedData.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    {user.address.street}, {user.address.suite},{' '}
                    {user.address.city}
                  </Td>
                  <Td>{user.website}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button onClick={() => handleEdit(user.id)}>Edit</Button>
                      <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <VStack spacing={2} align="flex-start">
            <Input
              type="text"
              placeholder="Login"
              value={login}
              onChange={handleLoginChange}
            />
            {loginError && <Text color="red.500">{loginError}</Text>}
          </VStack>

          <VStack spacing={2} align="flex-start">
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <Text color="red.500">{emailError}</Text>}
          </VStack>

          {editingUserId !== null && (
            <Input
              type="text"
              placeholder="ID"
              value={login}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLogin(e.target.value)}
              display="none"
            />
          )}

          <Button type="button" onClick={handleSubmit}>
            {editingUserId !== null ? 'Update User' : 'Add User'}
          </Button>
        </VStack>
      )}
    </>
  );
}
