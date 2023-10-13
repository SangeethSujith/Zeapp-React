import { useEffect, useState } from 'react';
import endpoints from '../../constants/endpoints';
import useAxios from '../../utils/hooks/useAxios';

const useUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const { post, get, del, put } = useAxios();

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await get(endpoints.users);
            setUsers(response.data.data);
            setErrorData(null);
        } catch (error) {
            setErrorData(error);
        } finally {
            setIsLoading(false);
        }
    };

    const createUser = async (user) => {
        try {
            const response = await post(endpoints.users, user);
            setUsers([...users, response.data]);
            setErrorData(null);
        } catch (error) {
            setErrorData(error);
        }
    };

    const updateUser = async (id, updatedUser) => {
        try {
            const response = await put(`${endpoints.users}/${id}`, updatedUser);
            const updatedUsers = users.map((user) => (user.id === id ? response.data : user));
            setUsers(updatedUsers);
            setErrorData(null);
        } catch (error) {
            setErrorData(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await del(`${endpoints.users}/${id}`);
            const updatedUsers = users.filter((user) => user.id !== id);
            setUsers(updatedUsers);
            setErrorData(null);
        } catch (error) {
            setErrorData(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        isLoading,
        error: errorData,
        createUser,
        updateUser,
        deleteUser,
    };
};

export default useUserManagement;
