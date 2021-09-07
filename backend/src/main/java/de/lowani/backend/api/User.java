package de.lowani.backend.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {

    @ApiModelProperty(required = true, example = "234", notes = "The ID of the user")
    private long id;

    @ApiModelProperty(example = "Peter Lustig", notes = "The name of the user")
    private String name;

    @ApiModelProperty(example = "user", notes = "The role of the user")
    private String role;

    @ApiModelProperty(example = "777", notes = "The current score of the user")
    private long score;

}
