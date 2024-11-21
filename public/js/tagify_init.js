document.addEventListener("DOMContentLoaded", function() {
    var tagifyInputs = document.querySelectorAll("input[name='tags']");

    tagifyInputs.forEach(function(input) {
        var url = input.getAttribute("data-url");

        var initialValue = input.value;
        if (initialValue) {
            try {
                var parsedValue = JSON.parse(initialValue);
                if (Array.isArray(parsedValue)) {
                    input.value = JSON.stringify(parsedValue.map(item => ({
                        id: item.id || null,
                        value: item.value || item
                    })));
                }
            } catch (e) {
                console.error("Invalid initial value format", e);
            }
        }

        var tagify = new Tagify(input, {
            tagTextProp: 'value',
            originalInputValueFormat: valuesArr => JSON.stringify(valuesArr.map(item => ({id: item.id, value: item.value})))
        });

        fetch(url)
            .then(response => response.json())
            .then(data => {
                tagify.settings.whitelist = data.map(tag => ({id: tag.id, value: tag.value}));
            })
            .catch(error => console.error("Error fetching tags:", error));
    });
});