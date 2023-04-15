package com.example.authjava.Services;

import java.util.ArrayList;

import com.example.authjava.Data.DTOs.UserClientDTO;
import com.example.authjava.Data.Models.UserModel;

public interface IUserService {
    
    public UserModel saveUser(UserModel user);

    public ArrayList<UserClientDTO> getFullUsers();

    public UserClientDTO getUser(Long userId);
}
