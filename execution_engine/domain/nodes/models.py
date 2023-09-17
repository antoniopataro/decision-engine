class Node:
    @classmethod
    def parse(cls, node):
        type = node.get("type")

        if type == "condition":
            return Condition.parse(node)

        if type == "output":
            return Output.parse(node)

        raise ValueError("Invalid node type.")


class Condition(Node):
    @classmethod
    def parse(cls, data):
        for key in ["condition", "then"]:
            if key not in data:
                raise KeyError(key)

        condition = data.get("condition")

        for key in ["criteria", "value", "variable"]:
            if key not in condition:
                raise KeyError(key)

        criteria = condition.get("criteria")

        if criteria not in ["<", "<=", "==", ">=", ">"]:
            raise ValueError("Invalid criteria value.")

        value = condition.get("value")

        if type(value) != int:
            raise TypeError("Invalid value type.")

        variable = condition.get("variable")

        if type(variable) != str:
            raise TypeError("Invalid variable type.")

        if "otherwise" in data:
            otherwise = data.get("otherwise")

            if not isinstance(otherwise, list):
                raise TypeError("Invalid otherwise type.")
            
            validated_otherwise = []

            for node in otherwise:
                validated_otherwise.append(super().parse(node))

            otherwise = validated_otherwise

        then = data.get("then")

        if not isinstance(then, list):
            raise TypeError("Invalid then type.")
        
        validated_then = []

        for node in then:
            validated_then.append(super().parse(node))

        then = validated_then

        return {
            "condition": {
                "criteria": criteria,
                "value": value,
                "variable": variable,
            },
            **({"otherwise": otherwise} if "otherwise" in data else {}),
            "then": then,
            "type": "condition",
        }


class Output(Node):
    @classmethod
    def parse(cls, data):
        for key in ["output"]:
            if key not in data:
                raise KeyError(key)

        output = data.get("output")

        if type(output) != bool:
            raise TypeError("Invalid output type.")

        return {"output": output, "type": "output"}
