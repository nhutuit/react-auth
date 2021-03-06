/**
* @Author: Tran Van Nhut <nhutdev>
* @Date:   2016-11-25T10:26:53+07:00
* @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2016-11-30T16:59:53+07:00
*/

'use strict';

Object.defineProperty(exports, "__esModule", {value: true});
exports.UserAuthWrapper = undefined;

var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _lodash = require('lodash.isempty');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
      default: obj
    };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : subClass.__proto__ = superClass;
  }

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i))
      continue;
    target[i] = obj[i];
  }
  return target;
}

var defaults = {
  LoadingComponent: function LoadingComponent() {
    return null;
  }, // dont render anything while authenticating
  failureRedirectPath: '/login',
  FailureComponent: undefined,
  redirectQueryParamName: 'redirect',
  wrapperDisplayName: 'AuthWrapper',
  predicate: function predicate(x) {
    return !(0, _lodash2.default)(x);
  },
  authenticatingSelector: function authenticatingSelector() {
    return false;
  },
  allowRedirectBack: true,
  propMapper: function propMapper(_ref) {
    var redirect = _ref.redirect,
      authData = _ref.authData,
      isAuthenticating = _ref.isAuthenticating,
      failureRedirectPath = _ref.failureRedirectPath,
      otherProps = _objectWithoutProperties(_ref, ['redirect', 'authData', 'isAuthenticating', 'failureRedirectPath']);

    return _extends({
      authData: authData
    }, otherProps);
  } // eslint-disable-line no-unused-vars
};

var UserAuthWrapper = exports.UserAuthWrapper = function UserAuthWrapper(args) {
  var _defaults$args = _extends({}, defaults, args),
    authSelector = _defaults$args.authSelector,
    authenticatingSelector = _defaults$args.authenticatingSelector,
    LoadingComponent = _defaults$args.LoadingComponent,
    failureRedirectPath = _defaults$args.failureRedirectPath,
    FailureComponent = _defaults$args.FailureComponent,
    wrapperDisplayName = _defaults$args.wrapperDisplayName,
    predicate = _defaults$args.predicate,
    allowRedirectBack = _defaults$args.allowRedirectBack,
    redirectAction = _defaults$args.redirectAction,
    redirectQueryParamName = _defaults$args.redirectQueryParamName,
    propMapper = _defaults$args.propMapper;

  var isAuthorized = function isAuthorized(authData) {
    return predicate(authData);
  };

  var createRedirect = function createRedirect(location, redirect, redirectPath) {
    var query = void 0;
    if (allowRedirectBack) {
      query = _defineProperty({}, redirectQueryParamName, '' + location.pathname + location.search);
    } else {
      query = {};
    }

    redirect({pathname: redirectPath, query: query});
  };

  var shouldRedirect = FailureComponent === undefined;
  var locationShape = _react.PropTypes.shape({pathname: _react.PropTypes.string.isRequired, search: _react.PropTypes.string.isRequired});

  // Wraps the component that needs the auth enforcement
  function wrapComponent(DecoratedComponent) {
    var _dec,
      _class,
      _class2,
      _temp2;

    var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
      if (redirectAction !== undefined) {
        return {
          redirect: function redirect(args) {
            return dispatch(redirectAction(args));
          }
        };
      } else {
        return {};
      }
    };

    var UserAuthWrapper = (_dec = (0, _reactRedux.connect)(function(state, ownProps) {
      return {
        authData: authSelector(state, ownProps),
        failureRedirectPath: typeof failureRedirectPath === 'function'
          ? failureRedirectPath(state, ownProps)
          : failureRedirectPath,
        isAuthenticating: authenticatingSelector(state, ownProps)
      };
    },
    mapDispatchToProps),
    _dec(_class = (_temp2 = _class2 = function(_Component) {
      _inherits(UserAuthWrapper, _Component);

      function UserAuthWrapper() {
        var _ref2;

        var _temp,
          _this,
          _ret;

        _classCallCheck(this, UserAuthWrapper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = UserAuthWrapper.__proto__ || Object.getPrototypeOf(UserAuthWrapper)).call.apply(_ref2, [this].concat(args))), _this), _this.getRedirectFunc = function(_ref3) {
          var redirect = _ref3.redirect;

          if (redirect) {
            return redirect;
          } else {
            if (!_this.context.router.replace) {
              /* istanbul ignore next sanity */
              throw new Error('You must provide a router context (or use React-Router 2.x) if not passing a redirectAction to ' + wrapperDisplayName);
            } else {
              return _this.context.router.replace;
            }
          }
        },
        _temp),
        _possibleConstructorReturn(_this, _ret);
      }

      _createClass(UserAuthWrapper, [
        {
          key: 'componentWillMount',
          value: function componentWillMount() {
            if (!this.props.isAuthenticating && !isAuthorized(this.props.authData) && shouldRedirect) {
              createRedirect(this.props.location, this.getRedirectFunc(this.props), this.props.failureRedirectPath);
            }
          }
        }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
            var willBeAuthorized = isAuthorized(nextProps.authData);
            var willbeAuthenticating = nextProps.isAuthenticating;
            var wasAuthorized = isAuthorized(this.props.authData);
            var wasAuthenticating = this.props.isAuthenticating;

            // Don't bother to redirect if:
            // 1. currently authenticating or FailureComponent is set
            if (willbeAuthenticating || !shouldRedirect)
              return;

            // Redirect if:
            if ( // 1. Was authorized, but no longer
            wasAuthorized && !willBeAuthorized ||
            // 2. Was not authorized and authenticating
            wasAuthenticating && !willBeAuthorized) {
              createRedirect(nextProps.location, this.getRedirectFunc(nextProps), nextProps.failureRedirectPath);
            }
          }
        }, {
          key: 'render',
          value: function render() {
            // Allow everything but the replace aciton creator to be passed down
            // Includes route props from React-Router and authData
            var _props = this.props,
              authData = _props.authData,
              isAuthenticating = _props.isAuthenticating;

            if (isAuthorized(authData)) {
              return _react2.default.createElement(DecoratedComponent, propMapper(this.props));
            } else if (isAuthenticating) {
              return _react2.default.createElement(LoadingComponent, propMapper(this.props));
            } else {
              // Display FailureComponent or nothing if FailureComponent is null
              // If FailureComponent is undefined user will never see this because
              // they will be redirected to failureRedirectPath
              return FailureComponent
                ? _react2.default.createElement(FailureComponent, propMapper(this.props))
                : null;
            }
          }
        }
      ]);

      return UserAuthWrapper;
    }(_react.Component),
    _class2.displayName = wrapperDisplayName + '(' + displayName + ')',
    _class2.propTypes = {
      failureRedirectPath: _react.PropTypes.string.isRequired,
      location: shouldRedirect
        ? locationShape.isRequired
        : locationShape,
      redirect: _react.PropTypes.func,
      authData: _react.PropTypes.object
    },
    _class2.contextTypes = {
      // Only used if no redirectAction specified
      router: _react.PropTypes.object
    },
    _temp2)) || _class);

    return (0, _hoistNonReactStatics2.default)(UserAuthWrapper, DecoratedComponent);
  }

  if (shouldRedirect) {
    wrapComponent.onEnter = function(store, nextState, replace) {
      var authData = authSelector(store.getState(), nextState);
      var isAuthenticating = authenticatingSelector(store.getState(), nextState);

      if (!isAuthorized(authData) && !isAuthenticating) {
        var redirectPath = typeof failureRedirectPath === 'function'
          ? failureRedirectPath(store.getState(), nextState)
          : failureRedirectPath;
        createRedirect(nextState.location, replace, redirectPath);
      }
    };
  }

  return wrapComponent;
};
