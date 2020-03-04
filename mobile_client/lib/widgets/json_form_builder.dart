import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

typedef JsonWidgetBuilder = Widget Function(BuildContext, String, Map<String, dynamic>);

class JsonFormBuilder extends StatefulWidget {
  final Map<String, Map<String, dynamic>> config;

  final Function(Map<String, dynamic> json) onSubmitted;

  const JsonFormBuilder({Key key, @required this.config, @required this.onSubmitted}) : super(key: key);

  @override
  _JsonFormBuilderState createState() => _JsonFormBuilderState();
}

class _JsonFormBuilderState extends State<JsonFormBuilder> {
  final Map<String, dynamic> _output = {};

  final GlobalKey<FormBuilderState> _fbKey = GlobalKey<FormBuilderState>();

  final Map<String, JsonWidgetBuilder> _widgetMap = {};

  final Map<String, FocusNode> _focusNodes = {};

  final Map<String, FormFieldValidator Function(dynamic, String)> _validatorMap = {
    "regex": (arg, errorText) => FormBuilderValidators.pattern(arg, errorText: errorText),
    "email": (arg, errorText) => FormBuilderValidators.email(errorText: errorText),
    "url": (arg, errorText) => FormBuilderValidators.url(errorText: errorText),
    "numeric": (arg, errorText) => FormBuilderValidators.numeric(errorText: errorText),
    "creditcard": (arg, errorText) => FormBuilderValidators.creditCard(errorText: errorText),
    "ip": (arg, errorText) => FormBuilderValidators.IP(version: arg, errorText: errorText),
    "min": (arg, errorText) => FormBuilderValidators.min(arg, errorText: errorText),
    "max": (arg, errorText) => FormBuilderValidators.max(arg, errorText: errorText),
    "minlength": (arg, errorText) => FormBuilderValidators.minLength(arg, errorText: errorText),
    "maxlength": (arg, errorText) => FormBuilderValidators.maxLength(arg, errorText: errorText),
    "required": (arg, errorText) => FormBuilderValidators.required(errorText: errorText),
    "requiredtrue": (arg, errorText) => FormBuilderValidators.requiredTrue(errorText: errorText),
    "date": (arg, errorText) => FormBuilderValidators.date(errorText: errorText),
  };

  @override
  void initState() {
    super.initState();
    this._widgetMap["textfield"] = buildTextField;
    this._widgetMap["checkbox"] = buildCheckbox;
    this._widgetMap["dropdown"] = buildDropdown;
    this._output.addEntries(this.widget.config.map((key, config) => MapEntry(key, config["default"] ?? null)).entries);
    this._focusNodes.addEntries(this.widget.config.map((key, config) => MapEntry(key, FocusNode(debugLabel: key))).entries);
  }

  @override
  void dispose() {
    this._focusNodes.forEach((key, node) => node.dispose());
    super.dispose();
  }

  InputDecoration _buildFieldInputDecoration(config) {
    return InputDecoration(
      labelText: config['label'] ?? "",
      hintText: config['hint'] ?? "",
    );
  }

  FormFieldValidator _parseValidator(key, config) {
    final arg = config is Map ? config['arg'] : config;
    return this._validatorMap[key](arg, config is Map ? config['error'] : null);
  }

  List<FormFieldValidator> _parseValidators(Map<String, dynamic> config) {
    return config != null ? config.entries.map((entry) => _parseValidator(entry.key, entry.value)).toList() : [];
  }

  Widget buildTextField(context, key, config) {
    return FormBuilderTextField(
      attribute: key,
      focusNode: this._focusNodes[key],
      maxLines: config['maxlines'] ?? 1,
      obscureText: config['obscure'] ?? false,
      valueTransformer: (value) => config['trim'] == false ? value : (value as String).trim(),
      decoration: _buildFieldInputDecoration(config),
      validators: _parseValidators(config['validators']),
      onEditingComplete: () => FocusScope.of(context).nextFocus(),
    );
  }

  Widget buildCheckbox(context, key, config) {
    return FormBuilderCheckbox(
      label: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Text(config["label"] ?? ""),
      ),
      attribute: key,
      validators: _parseValidators(config['validators']),
    );
  }

  Widget buildDropdown(context, key, config) {
    return FormBuilderDropdown(
      items: config['items']
          .map((item) => DropdownMenuItem(
                value: item,
                child: Text(item),
              ))
          .toList(),
      attribute: key,
      validators: _parseValidators(config['validators']),
      decoration: _buildFieldInputDecoration(config),
    );
  }

  Widget generateWidget(BuildContext context, String key, Map<String, dynamic> config) {
    return this._widgetMap[config["type"]](context, key, config);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FormBuilder(
        key: _fbKey,
        autovalidate: true,
        initialValue: Map.fromEntries(
          this
              .widget.config
              .entries
              .where((entry) => entry.value['default'] != null)
              .map((entry) => MapEntry(entry.key, entry.value['default'])),
        ),
        child: DefaultFocusTraversal(
          policy: WidgetOrderFocusTraversalPolicy(),
          child: ListView(
            children:
                (this.widget.config.map((key, config) => MapEntry(key, generateWidget(context, key, config))).values.toList() +
                        [
                          FlatButton(
                            onPressed: () {
                              if (_fbKey.currentState.saveAndValidate()) widget.onSubmitted(_fbKey.currentState.value);
                            },
                            child: Text("Valider"),
                            color: Theme.of(context).buttonColor,
                          )
                        ])
                    .map((item) => Padding(
                          padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                          child: item,
                        ))
                    .toList(),
          ),
        ),
      ),
    );
  }
}
