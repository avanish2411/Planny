import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Image, ScrollView, Linking,
  StyleSheet, Modal, Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/myStore';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootNavigation';
import { Divider } from 'react-native-paper';
import { setUser } from '../redux/slices/UserSlice';

type AboutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditDetails'>;

const About = () => {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const user = useSelector((state: RootState) => state.users.user);
  const dispatch = useDispatch();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [supportModalVisible, setSupportModalVisible] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const openXAccount = () => Linking.openURL('https://x.com/IamAvanish24');
  const openDiscordAccount = () => Linking.openURL('https://discord.com/invite/_.avanish._');

  const SignOut = () => dispatch(setUser({ isAuthenticated: false }));

  const openSupportModal = () => setSupportModalVisible(true);

  const menuItems = [
    { title: 'Join on X', icon: 'twitter', action: openXAccount },
    { title: 'Join on Discord', icon: 'discord', action: openDiscordAccount },
    { title: 'Support me', icon: 'currency-rupee', action: openSupportModal },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.profileContainer, { marginTop: insets.top + 50 }]}>
        <Image source={require('../assets/boy.png')} style={styles.profileImage} />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
        </View>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('EditDetails')}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <View key={index}>
            <TouchableOpacity style={styles.menuItem} onPress={item.action}>
              <View style={styles.menuItemContent}>
                <MaterialIcon name={item.icon} size={24} style={styles.menuItemIcon} />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
            {index < menuItems.length - 1 && <Divider style={styles.divider} />}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={SignOut}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 0.0.10</Text>
      <View style={{ height: insets.bottom + 20 }} />

      <Modal animationType="slide" transparent visible={supportModalVisible} onRequestClose={() => setSupportModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSupportModalVisible(false)}>
              <MaterialIcon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Support Me</Text>
            <Image source={require('../assets/payment.jpg')} style={styles.supportImage} resizeMode="contain" />
            <Text style={styles.modalText}>Thank you for your support! Your contribution helps me continue developing this app.</Text>
            <View style={styles.paymentOptions}>
              <Text style={styles.paymentOptionsText}>Payment Options:</Text>
              <View style={styles.paymentList}>
                <View style={styles.paymentItem}>
                  <MaterialIcon name="credit-card" size={20} color="#4DA6FF" />
                  <Text style={styles.paymentItemText}>UPI: avanishsingh2411-1@oksbi</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setSupportModalVisible(false)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
  },
  editProfileButton: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#4DA6FF',
  },
  editProfileButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
  menuContainer: {
    marginTop: 24,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: '#fff',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    marginLeft: 56,
  },
  logoutButton: {
    marginTop: 24,
    marginHorizontal: 16,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#4DA6FF',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  versionText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    color: '#4DA6FF',
  },
  supportImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 32
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  paymentOptions: {
    width: '100%',
    marginBottom: 20,
  },
  paymentOptionsText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  paymentList: {
    width: '100%',
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentItemText: {
    marginLeft: 10,
    fontSize: 14,
  },
  closeModalButton: {
    backgroundColor: '#4DA6FF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  closeModalButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default About;
