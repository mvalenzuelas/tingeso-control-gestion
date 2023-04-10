package com.example.authjava.Data.DTOs;

import com.example.authjava.Data.Models.RoleModel;
import com.example.authjava.Data.Models.UserModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
public class UserClientDTO {
    private Long id;
    private String email, firstName, lastName;
    private ArrayList<String> roles;

    public static UserClientDTO fromUserModel(UserModel userModel, ArrayList<RoleModel> roles) {
        return new UserClientDTO(
            userModel.getId(),
            userModel.getEmail(),
            userModel.getFirstName(),
            userModel.getLastName(),
            new ArrayList<>(roles.stream().map(RoleModel::getName).collect(Collectors.toList()))
        );
    }
}
