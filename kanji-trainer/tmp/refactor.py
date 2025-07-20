import json

dictionary: dict[str, dict[str, str | list[str]]] = {}

with open("tmp/dictionaryJa.txt", "r", encoding="utf-8") as file:
    for line in file.readlines():
        obj = json.loads(line)
        dictionary[obj["character"]] = {
            "meaning": obj.get("definition", "n/a"),
            "kun": obj.get("kun", []),
            "on": obj.get("on", []),
        }

#json.dump(dictionary, open("dictionary.json", "w", encoding="utf-8"), ensure_ascii=False)

