import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { supabase } from '../../lib/supabase';
import { useAuth } from '../providers/AuthProvider';

const UserScreen = () => {
    const [Users, setUser] = React.useState([]);
    const { user } = useAuth();
    useEffect(() => {
        // Fetch users from API or context
        const fetchUsers = async () => {
            try {
                let { data: profiles, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .neq('id', user?.id) // Exclude the current user
                if (error) {
                    console.error('Error fetching users:', error);  
                    throw error;
                }
                setUser(profiles);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers();
    }, []);

    return (
        <FlatList
            data={Users}
            renderItem={({ item }) => (
                <View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#ff0f0fff' }}>
                    <Text>{item.full_name}</Text>
                </View>
            )}
        />
    )
}

export default UserScreen