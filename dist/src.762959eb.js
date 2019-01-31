// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"/qeD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElement = createElement;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReactElement = function ReactElement(type, props) {
  _classCallCheck(this, ReactElement);

  this.type = type;
  this.props = props;
};

function createElement(type, config, children) {
  var props = {};
  if (config !== null) {
    Object.keys(config).forEach(function (propName) {
      return props[propName] = config[propName];
    });
  }
  // if (children.length >= 1) {
  //   props.children = children.length === 1 ? children[0] : children
  // }
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }
  return new ReactElement(type, props);
}
},{}],"FIQZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = exports.Component = function () {
  function Component(props) {
    _classCallCheck(this, Component);

    this.props = props;
    this.updater = {};
  }

  _createClass(Component, [{
    key: "setState",
    value: function setState(partialState) {
      this.updater.enqueueSetState(this, partialState);
    }
  }]);

  return Component;
}();
},{}],"hYfm":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ReactElement = require('./ReactElement');

var _ReactComponent = require('./ReactComponent');

var React = {
  Component: _ReactComponent.Component,
  createElement: _ReactElement.createElement,
  Suspense: Symbol.for('react.suspense')
};

exports.default = React;
},{"./ReactElement":"/qeD","./ReactComponent":"FIQZ"}],"uHoo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.msToExpirationTime = msToExpirationTime;
exports.expirationTimeToMs = expirationTimeToMs;
exports.computeAsyncExpiration = computeAsyncExpiration;
exports.computeInteractiveExpiration = computeInteractiveExpiration;
var NoWork = exports.NoWork = 0;
var Sync = exports.Sync = 1;

var UNIT_SIZE = 10;
var MAGIC_NUMBER_OFFSET = 2;

// 1 unit of expiration time represents 10ms.
function msToExpirationTime(ms) {
  // Always add an offset so that we don't clash with the magic number for NoWork.
  return (ms / UNIT_SIZE | 0) + MAGIC_NUMBER_OFFSET;
}

function expirationTimeToMs(expirationTime) {
  return (expirationTime - MAGIC_NUMBER_OFFSET) * UNIT_SIZE;
}

function ceiling(num, precision) {
  return ((num / precision | 0) + 1) * precision;
}

function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
  return MAGIC_NUMBER_OFFSET + ceiling(currentTime - MAGIC_NUMBER_OFFSET + expirationInMs / UNIT_SIZE, bucketSizeMs / UNIT_SIZE);
}

var LOW_PRIORITY_EXPIRATION = exports.LOW_PRIORITY_EXPIRATION = 5000;
var LOW_PRIORITY_BATCH_SIZE = exports.LOW_PRIORITY_BATCH_SIZE = 250;

function computeAsyncExpiration(currentTime) {
  return computeExpirationBucket(currentTime, LOW_PRIORITY_EXPIRATION, LOW_PRIORITY_BATCH_SIZE);
}

// We intentionally set a higher expiration time for interactive updates in
// dev than in production.
//
// If the main thread is being blocked so long that you hit the expiration,
// it's a problem that could be solved with better scheduling.
//
// People will be more likely to notice this and fix it with the long
// expiration time in development.
//
// In production we opt for better UX at the risk of masking scheduling
// problems, by expiring fast.
var HIGH_PRIORITY_EXPIRATION = exports.HIGH_PRIORITY_EXPIRATION = 500;
var HIGH_PRIORITY_BATCH_SIZE = exports.HIGH_PRIORITY_BATCH_SIZE = 100;

function computeInteractiveExpiration(currentTime) {
  return computeExpirationBucket(currentTime, HIGH_PRIORITY_EXPIRATION, HIGH_PRIORITY_BATCH_SIZE);
}
},{}],"YmSv":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUpdate = createUpdate;
exports.enqueueUpdate = enqueueUpdate;
exports.processUpdateQueue = processUpdateQueue;

var _ReactFiberExpirationTime = require('./ReactFiberExpirationTime');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Assume when processing the updateQueue, process all updates together
var UpdateQueue = function UpdateQueue(baseState) {
  _classCallCheck(this, UpdateQueue);

  this.baseState = baseState;
  this.firstUpdate = null;
  this.lastUpdate = null;
};

var Update = function Update() {
  _classCallCheck(this, Update);

  this.payload = null;
  this.next = null;
};

function createUpdate() {
  return new Update();
}

function appendUpdateToQueue(queue, update) {
  // Append the update to the end of the list.
  if (queue.lastUpdate === null) {
    // Queue is empty
    queue.firstUpdate = queue.lastUpdate = update;
  } else {
    queue.lastUpdate.next = update;
    queue.lastUpdate = update;
  }
}

function enqueueUpdate(fiber, update) {
  // Update queues are created lazily.
  var queue = fiber.updateQueue;
  if (queue === null) {
    queue = fiber.updateQueue = new UpdateQueue(fiber.memoizedState);
  }
  appendUpdateToQueue(queue, update);
}

function getStateFromUpdate(update, prevState) {
  var partialState = update.payload;
  if (partialState === null || partialState === undefined) {
    // Null and undefined are treated as no-ops.
    return prevState;
  }
  // Merge the partial state and the previous state.
  return Object.assign({}, prevState, partialState);
}

function processUpdateQueue(workInProgress, queue) {
  // Iterate through the list of updates to compute the result.
  var update = queue.firstUpdate;
  var resultState = queue.baseState;
  while (update !== null) {
    resultState = getStateFromUpdate(update, resultState);
    update = update.next;
  }
  queue.baseState = resultState;
  queue.firstUpdate = queue.lastUpdate = null;
  workInProgress.expirationTime = _ReactFiberExpirationTime.NoWork;
  workInProgress.memoizedState = resultState;
}
},{"./ReactFiberExpirationTime":"uHoo"}],"e6GS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Don't change these two values. They're used by React Dev Tools.
var NoEffect = /*              */exports.NoEffect = 0;
var PerformedWork = /*         */exports.PerformedWork = 1;

// You can change the rest (and add more).
var Placement = /*             */exports.Placement = 2;
var Update = /*                */exports.Update = 4;
var PlacementAndUpdate = /*    */exports.PlacementAndUpdate = 6;
var Deletion = /*              */exports.Deletion = 8;
var ContentReset = /*          */exports.ContentReset = 16;
var Callback = /*              */exports.Callback = 32;
var DidCapture = /*            */exports.DidCapture = 64;
var Ref = /*                   */exports.Ref = 128;
var Snapshot = /*              */exports.Snapshot = 256;

// Update & Callback & Ref & Snapshot
var LifecycleEffectMask = /*   */exports.LifecycleEffectMask = 420;

// Union of all host effects
var HostEffectMask = /*        */exports.HostEffectMask = 511;

var Incomplete = /*            */exports.Incomplete = 512;
var ShouldCapture = /*         */exports.ShouldCapture = 1024;
},{}],"hOTV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var FunctionalComponent = exports.FunctionalComponent = 0;
var FunctionalComponentLazy = exports.FunctionalComponentLazy = 1;
var ClassComponent = exports.ClassComponent = 2;
var ClassComponentLazy = exports.ClassComponentLazy = 3;
var IndeterminateComponent = exports.IndeterminateComponent = 4; // Before we know whether it is functional or class
var HostRoot = exports.HostRoot = 5; // Root of a host tree. Could be nested inside another node.
var HostPortal = exports.HostPortal = 6; // A subtree. Could be an entry point to a different renderer.
var HostComponent = exports.HostComponent = 7;
var HostText = exports.HostText = 8;
var Fragment = exports.Fragment = 9;
var Mode = exports.Mode = 10;
var ContextConsumer = exports.ContextConsumer = 11;
var ContextProvider = exports.ContextProvider = 12;
var ForwardRef = exports.ForwardRef = 13;
var ForwardRefLazy = exports.ForwardRefLazy = 14;
var Profiler = exports.Profiler = 15;
var SuspenseComponent = exports.SuspenseComponent = 16;
},{}],"K36e":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FiberNode = FiberNode;
exports.createHostRootFiber = createHostRootFiber;

var _ReactSideEffectTags = require('../shared/ReactSideEffectTags');

var _ReactFiberExpirationTime = require('./ReactFiberExpirationTime');

var _ReactWorkTags = require('../shared/ReactWorkTags');

function FiberNode(tag, pendingProps) {
  // Instance
  // Tag identifying the type of fiber.
  this.tag = tag;
  // Unique identifier of this child.
  // this.key = key
  // The function/class/module associated with this fiber.
  this.type = null;
  // The local state associated with this fiber
  this.stateNode = null;

  // Fiber
  // The Fiber to return to after finishing processing this one.
  // This is effectively the parent, but there can be multiple parents (two)
  // so this is only the parent of the thing we're currently processing.
  // It is conceptually the same as the return address of a stack frame.
  this.return = null;
  // Singly Linked List Tree Structure.
  this.child = null;
  this.sibling = null;

  // Input is the data coming into process this fiber. Arguments. Props.
  this.pendingProps = pendingProps; // This type will be more specific once we overload the tag.
  this.memoizedProps = null; // The props used to create the output

  // A queue of state updates and callbacks.
  this.updateQueue = null;

  // The state used to create the output
  this.memoizedState = null;

  // Effects
  this.effectTag = _ReactSideEffectTags.NoEffect;
  // Singly linked list fast path to the next fiber with side-effects.
  this.nextEffect = null;
  // The first and last fiber with side-effect within this subtree. This allows
  // us to reuse a slice of the linked list when we reuse the work done within
  // this fiber.
  this.firstEffect = null;
  this.lastEffect = null;

  // Represents a time in the future by which this work should be completed.
  // Does not include work found in its subtree.
  this.expirationTime = _ReactFiberExpirationTime.NoWork;

  // This is a pooled version of a Fiber. Every fiber that gets updated will
  // eventually have a pair. There are cases when we can clean up pairs to save
  // memory if we need to.
  this.alternate = null;
}

function createHostRootFiber() {
  return new FiberNode(_ReactWorkTags.HostRoot, null);
}
},{"../shared/ReactSideEffectTags":"e6GS","./ReactFiberExpirationTime":"uHoo","../shared/ReactWorkTags":"hOTV"}],"a+Ks":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFiberRoot = createFiberRoot;

var _ReactFiber = require('./ReactFiber');

var _ReactFiberExpirationTime = require('./ReactFiberExpirationTime');

function createFiberRoot(containerInfo) {
  var uninitializedFiber = (0, _ReactFiber.createHostRootFiber)();
  var root = {
    // The currently active root fiber. This is the mutable root of the tree.
    current: uninitializedFiber,
    // Any additional information from the host associated with this root.
    containerInfo: containerInfo,
    // A finished work-in-progress HostRoot that's ready to be committed.
    finishedWork: null,
    expirationTime: _ReactFiberExpirationTime.NoWork
  };
  uninitializedFiber.stateNode = root;
  return root;
}
},{"./ReactFiber":"K36e","./ReactFiberExpirationTime":"uHoo"}],"EDZr":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInteractiveEvent = isInteractiveEvent;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var interactiveEventTypeNames = ['blur', 'cancel', 'click', 'close', 'contextMenu', 'copy', 'cut', 'auxClick', 'doubleClick', 'dragEnd', 'dragStart', 'drop', 'focus', 'input', 'invalid', 'keyDown', 'keyPress', 'keyUp', 'mouseDown', 'mouseUp', 'paste', 'pause', 'play', 'pointerCancel', 'pointerDown', 'pointerUp', 'rateChange', 'reset', 'seeked', 'submit', 'touchCancel', 'touchEnd', 'touchStart', 'volumeChange'];

var nonInteractiveEventTypeNames = ['abort', 'animationEnd', 'animationIteration', 'animationStart', 'canPlay', 'canPlayThrough', 'drag', 'dragEnter', 'dragExit', 'dragLeave', 'dragOver', 'durationChange', 'emptied', 'encrypted', 'ended', 'error', 'gotPointerCapture', 'load', 'loadedData', 'loadedMetadata', 'loadStart', 'lostPointerCapture', 'mouseMove', 'mouseOut', 'mouseOver', 'playing', 'pointerMove', 'pointerOut', 'pointerOver', 'progress', 'scroll', 'seeking', 'stalled', 'suspend', 'timeUpdate', 'toggle', 'touchMove', 'transitionEnd', 'waiting', 'wheel'];

var eventTypeNames = exports.eventTypeNames = [].concat(interactiveEventTypeNames, nonInteractiveEventTypeNames);
var bubblePhaseRegistrationNames = exports.bubblePhaseRegistrationNames = eventTypeNames.map(function (name) {
  return 'on' + name[0].toLocaleUpperCase() + name.slice(1);
});
var capturePhaseRegistrationNames = exports.capturePhaseRegistrationNames = bubblePhaseRegistrationNames.map(function (name) {
  return name + 'Capture';
});
var registrationNames = exports.registrationNames = [].concat(_toConsumableArray(bubblePhaseRegistrationNames), _toConsumableArray(capturePhaseRegistrationNames));
function isInteractiveEvent(eventType) {
  return interactiveEventTypeNames.includes(eventType);
}
},{}],"eIcv":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traverseTwoPhase = traverseTwoPhase;

var _ReactWorkTags = require('./ReactWorkTags');

function getParent(inst) {
  do {
    inst = inst.return;
    // TODO: If this is a HostRoot we might want to bail out.
    // That is depending on if we want nested subtrees (layers) to bubble
    // events to their parent. We could also go through parentNode on the
    // host node but that wouldn't work for React Native and doesn't let us
    // do the portal feature.
  } while (inst && inst.tag !== _ReactWorkTags.HostComponent);
  if (inst) {
    return inst;
  }
  return null;
}

/**
 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
 */
function traverseTwoPhase(inst, fn, arg) {
  var path = [];
  while (inst) {
    path.push(inst);
    inst = getParent(inst);
  }
  var i = void 0;
  for (i = path.length; i-- > 0;) {
    fn(path[i], 'captured', arg);
  }
  for (i = 0; i < path.length; i++) {
    fn(path[i], 'bubbled', arg);
  }
}
},{"./ReactWorkTags":"hOTV"}],"2SB4":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ReactFiberExpirationTime = require('./ReactFiberExpirationTime');

var _ReactUpdateQueue = require('./ReactUpdateQueue');

var _ReactFiberRoot = require('./ReactFiberRoot');

var _ReactFiber = require('./ReactFiber');

var _isInteractiveEvent = require('../event/isInteractiveEvent');

var _ReactWorkTags = require('../shared/ReactWorkTags');

var _ReactSideEffectTags = require('../shared/ReactSideEffectTags');

var _ReactTreeTraversal = require('../shared/ReactTreeTraversal');

function Reconciler(hostConfig) {
  var now = hostConfig.now;
  var shouldSetTextContent = hostConfig.shouldSetTextContent;
  var createInstance = hostConfig.createInstance;
  var finalizeInitialChildren = hostConfig.finalizeInitialChildren;
  var appendInitialChild = hostConfig.appendInitialChild;
  var scheduleDeferredCallback = hostConfig.scheduleDeferredCallback;
  var prepareUpdate = hostConfig.prepareUpdate;
  var appendChildToContainer = hostConfig.appendChildToContainer;
  var removeChildFromContainer = hostConfig.removeChildFromContainer;
  var commitUpdate = hostConfig.commitUpdate;

  var scheduledRoot = null;
  var isRendering = false;
  var deadline = null;
  var deadlineDidExpire = false;
  var isBatchingInteractiveUpdates = false;
  var isBatchingUpdates = false;
  var isDispatchControlledEvent = false;
  var originalStartTimeMs = now();
  var currentRendererTime = (0, _ReactFiberExpirationTime.msToExpirationTime)(originalStartTimeMs);
  var currentSchedulerTime = currentRendererTime;
  var isWorking = false;
  var isCommitting = false;
  var nextUnitOfWork = null;
  var nextRenderExpirationTime = _ReactFiberExpirationTime.NoWork;
  var shouldTrackSideEffects = true;
  var timeHeuristicForUnitOfWork = 1;

  function createContainer(containerInfo) {
    return (0, _ReactFiberRoot.createFiberRoot)(containerInfo);
  }

  function updateContainer(element, container) {
    var current = container.current;
    var currentTime = requestCurrentTime();
    var expirationTime = computeExpirationForFiber(currentTime);
    return scheduleRootUpdate(current, element, expirationTime);
  }

  function requestCurrentTime() {
    // requestCurrentTime is called by the scheduler to compute an expiration
    // time.
    //
    // Expiration times are computed by adding to the current time (the start
    // time). However, if two updates are scheduled within the same event, we
    // should treat their start times as simultaneous, even if the actual clock
    // time has advanced between the first and second call.

    // In other words, because expiration times determine how updates are batched,
    // we want all updates of like priority that occur within the same event to
    // receive the same expiration time. Otherwise we get tearing.
    //
    // We keep track of two separate times: the current "renderer" time and the
    // current "scheduler" time. The renderer time can be updated whenever; it
    // only exists to minimize the calls performance.now.
    //
    // But the scheduler time can only be updated if there's no pending work, or
    // if we know for certain that we're not in the middle of an event.
    if (isRendering) {
      return currentSchedulerTime;
    }
    if (!scheduledRoot) {
      recomputeCurrentRendererTime();
      currentSchedulerTime = currentRendererTime;
      return currentSchedulerTime;
    }
    return currentSchedulerTime;
  }

  function recomputeCurrentRendererTime() {
    var currentTimeMs = now() - originalStartTimeMs;
    currentRendererTime = (0, _ReactFiberExpirationTime.msToExpirationTime)(currentTimeMs);
  }

  function computeExpirationForFiber(currentTime) {
    var expirationTime = void 0;
    if (isWorking) {
      if (isCommitting) {
        expirationTime = _ReactFiberExpirationTime.Sync;
      } else {
        expirationTime = nextRenderExpirationTime;
      }
    } else {
      if (isBatchingInteractiveUpdates) {
        expirationTime = (0, _ReactFiberExpirationTime.computeInteractiveExpiration)(currentTime);
      } else {
        expirationTime = (0, _ReactFiberExpirationTime.computeAsyncExpiration)(currentTime);
      }
    }
    return expirationTime;
  }

  function scheduleRootUpdate(current, element, expirationTime) {
    var update = (0, _ReactUpdateQueue.createUpdate)();
    update.payload = { element: element };
    (0, _ReactUpdateQueue.enqueueUpdate)(current, update);
    scheduleWork(current, expirationTime);
    return expirationTime;
  }

  function scheduleWorkToRoot(fiber, expirationTime) {
    if (fiber.expirationTime === _ReactFiberExpirationTime.NoWork || fiber.expirationTime > expirationTime) {
      fiber.expirationTime = expirationTime;
    }
    var alternate = fiber.alternate;
    if (alternate !== null && (alternate.expirationTime === _ReactFiberExpirationTime.NoWork || alternate.expirationTime > expirationTime)) {
      alternate.expirationTime = expirationTime;
    }
    var node = fiber;
    while (node !== null) {
      if (node.return === null && node.tag === _ReactWorkTags.HostRoot) {
        return node.stateNode;
      }
      node = node.return;
    }
    return null;
  }

  function scheduleWork(fiber, expirationTime) {
    var root = scheduleWorkToRoot(fiber, expirationTime);
    root.expirationTime = expirationTime;
    requestWork(root, expirationTime);
  }

  function requestWork(root, expirationTime) {
    scheduledRoot = root;
    if (isRendering) {
      return;
    }
    if (isBatchingUpdates) {
      return;
    }
    if (expirationTime === _ReactFiberExpirationTime.Sync) {
      performSyncWork();
    } else {
      scheduleCallbackWithExpirationTime(root, expirationTime);
    }
  }

  function scheduleCallbackWithExpirationTime(root, expirationTime) {
    var currentMs = now() - originalStartTimeMs;
    var expirationTimeMs = (0, _ReactFiberExpirationTime.expirationTimeToMs)(expirationTime);
    var timeout = expirationTimeMs - currentMs;
    scheduleDeferredCallback(performAsyncWork, { timeout: timeout });
  }

  function performSyncWork() {
    performWork(null);
  }

  function performAsyncWork(dl) {
    performWork(dl);
  }

  function performWork(dl) {
    deadline = dl;
    if (deadline !== null) {
      recomputeCurrentRendererTime();
      currentSchedulerTime = currentRendererTime;
      while (scheduledRoot !== null && (!deadlineDidExpire || currentRendererTime >= scheduledRoot.expirationTime)) {
        performWorkOnRoot(scheduledRoot, currentRendererTime >= scheduledRoot.expirationTime);
        recomputeCurrentRendererTime();
        currentSchedulerTime = currentRendererTime;
      }
    } else {
      while (scheduledRoot !== null) {
        performWorkOnRoot(scheduledRoot, true);
      }
    }
    if (scheduledRoot) {
      scheduleCallbackWithExpirationTime(scheduledRoot, scheduledRoot.expirationTime);
    }
    deadline = null;
    deadlineDidExpire = false;
  }

  function shouldYield() {
    if (deadlineDidExpire) {
      return true;
    }
    if (deadline === null || deadline.timeRemaining() > timeHeuristicForUnitOfWork) {
      return false;
    }
    deadlineDidExpire = true;
    return true;
  }

  function performWorkOnRoot(root, isExpired) {
    isRendering = true;
    if (isExpired) {
      var finishedWork = root.finishedWork;
      if (finishedWork !== null) {
        completeRoot(root, finishedWork);
      } else {
        root.finishedWork = null;
        var isYieldy = false;
        renderRoot(root, isYieldy);
        finishedWork = root.finishedWork;
        if (finishedWork !== null) {
          completeRoot(root, finishedWork);
        }
      }
    } else {
      var _finishedWork = root.finishedWork;
      if (_finishedWork !== null) {
        completeRoot(root, _finishedWork);
      } else {
        root.finishedWork = null;
        var _isYieldy = true;
        renderRoot(root, _isYieldy);
        _finishedWork = root.finishedWork;
        if (_finishedWork !== null) {
          if (!shouldYield()) {
            completeRoot(root, _finishedWork);
          } else {
            root.finishedWork = _finishedWork;
          }
        }
      }
    }
    isRendering = false;
  }

  function createWorkInProgress(current, pendingProps, expirationTime) {
    var workInProgress = current.alternate;
    if (workInProgress === null) {
      workInProgress = new _ReactFiber.FiberNode(current.tag, pendingProps);
      workInProgress.type = current.type;
      workInProgress.stateNode = current.stateNode;
      workInProgress.alternate = current;
      current.alternate = workInProgress;
    } else {
      workInProgress.pendingProps = pendingProps;
      workInProgress.effectTag = _ReactSideEffectTags.NoEffect;
      workInProgress.nextEffect = null;
      workInProgress.firstEffect = null;
      workInProgress.lastEffect = null;
    }
    if (pendingProps !== current.pendingProps) {
      workInProgress.expirationTime = expirationTime;
    } else {
      workInProgress.expirationTime = current.expirationTime;
    }
    workInProgress.child = current.child;
    workInProgress.memoizedProps = current.memoizedProps;
    workInProgress.memoizedState = current.memoizedState;
    workInProgress.updateQueue = current.updateQueue;
    workInProgress.sibling = current.sibling;
    return workInProgress;
  }

  function renderRoot(root, isYieldy) {
    isWorking = true;
    var expirationTime = root.expirationTime;
    if (expirationTime !== nextRenderExpirationTime || nextUnitOfWork === null) {
      nextRenderExpirationTime = expirationTime;
      nextUnitOfWork = createWorkInProgress(root.current, null, nextRenderExpirationTime);
    }
    do {
      try {
        workLoop(isYieldy);
      } catch (thrownValue) {
        var sourceFiber = nextUnitOfWork;
        var returnFiber = sourceFiber.return;
        throwException(root, returnFiber, sourceFiber, thrownValue, nextRenderExpirationTime);
        nextUnitOfWork = completeUnitOfWork(sourceFiber);
        continue;
      }
      break;
    } while (true);
    isWorking = false;
    if (nextUnitOfWork !== null) {
      return;
    }
    root.finishedWork = root.current.alternate;
  }

  function throwException(root, returnFiber, sourceFiber, value, renderExpirationTime) {
    sourceFiber.effectTag |= _ReactSideEffectTags.Incomplete;
    sourceFiber.firstEffect = sourceFiber.lastEffect = null;
    if (value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.then === 'function') {
      var thenable = value;
      var workInProgress = returnFiber;
      do {
        if (workInProgress.tag === _ReactWorkTags.SuspenseComponent) {
          var onResolve = retrySuspendedRoot.bind(null, root, workInProgress);
          thenable.then(onResolve);
          workInProgress.expirationTime = renderExpirationTime;
          return;
        }
        workInProgress = workInProgress.return;
      } while (workInProgress !== null);
    }
  }

  function retrySuspendedRoot(root, fiber) {
    var currentTime = requestCurrentTime();
    var retryTime = computeExpirationForFiber(currentTime);
    root.expirationTime = retryTime;
    scheduleWorkToRoot(fiber, retryTime);
    requestWork(root, root.expirationTime);
  }

  function workLoop(isYieldy) {
    if (!isYieldy) {
      while (nextUnitOfWork !== null) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      }
    } else {
      while (nextUnitOfWork !== null && !shouldYield()) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      }
    }
  }

  function performUnitOfWork(workInProgress) {
    var current = workInProgress.alternate;
    var next = null;
    next = beginWork(current, workInProgress, nextRenderExpirationTime);
    if (next === null) {
      next = completeUnitOfWork(workInProgress);
    }
    return next;
  }

  function beginWork(current, workInProgress, renderExpirationTime) {
    workInProgress.expirationTime = _ReactFiberExpirationTime.NoWork;
    var Component = workInProgress.type;
    var unresolvedProps = workInProgress.pendingProps;
    switch (workInProgress.tag) {
      case _ReactWorkTags.ClassComponent:
        {
          return updateClassComponent(current, workInProgress, Component, unresolvedProps, renderExpirationTime);
        }
      case _ReactWorkTags.HostRoot:
        {
          return updateHostRoot(current, workInProgress, renderExpirationTime);
        }
      case _ReactWorkTags.HostComponent:
        {
          return updateHostComponent(current, workInProgress, renderExpirationTime);
        }
      case _ReactWorkTags.Fragment:
        {
          return updateFragment(current, workInProgress, renderExpirationTime);
        }
      case _ReactWorkTags.SuspenseComponent:
        {
          return updateSuspenseComponent(current, workInProgress, renderExpirationTime);
        }
      default:
        throw new Error('unknown unit of work tag');
    }
  }

  function updateFragment(current, workInProgress, renderExpirationTime) {
    var nextChildren = workInProgress.pendingProps;
    reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
    return workInProgress.child;
  }

  function updateSuspenseComponent(current, workInProgress, renderExpirationTime) {
    var nextProps = workInProgress.pendingProps;
    var nextDidTimeout = (workInProgress.effectTag & _ReactSideEffectTags.DidCapture) !== _ReactSideEffectTags.NoEffect;
    var nextChildren = nextDidTimeout ? nextProps.fallback : nextProps.children;
    workInProgress.memoizedProps = nextProps;
    workInProgress.memoizedState = nextDidTimeout;
    reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
    return workInProgress.child;
  }

  function get(key) {
    return key._reactInternalFiber;
  }

  function set(key, value) {
    key._reactInternalFiber = value;
  }

  var classComponentUpdater = {
    enqueueSetState: function enqueueSetState(inst, payload) {
      var fiber = get(inst);
      var currentTime = requestCurrentTime();
      var expirationTime = computeExpirationForFiber(currentTime);
      var update = (0, _ReactUpdateQueue.createUpdate)();
      update.payload = payload;
      (0, _ReactUpdateQueue.enqueueUpdate)(fiber, update);
      scheduleWork(fiber, expirationTime);
    }
  };
  function adoptClassInstance(workInProgress, instance) {
    instance.updater = classComponentUpdater;
    workInProgress.stateNode = instance;
    set(instance, workInProgress);
  }

  function constructClassInstance(workInProgress, ctor, props) {
    var instance = new ctor(props);
    workInProgress.memoizedState = instance.state !== null && instance.state !== undefined ? instance.state : null;
    adoptClassInstance(workInProgress, instance);
    return instance;
  }

  function applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, nextProps) {
    var prevState = workInProgress.memoizedState;
    var partialState = getDerivedStateFromProps(nextProps, prevState);
    var memoizedState = partialState === null || partialState === undefined ? prevState : Object.assign({}, prevState, partialState);
    workInProgress.memoizedState = memoizedState;
    var updateQueue = workInProgress.updateQueue;
    if (updateQueue !== null && workInProgress.expirationTime === _ReactFiberExpirationTime.NoWork) {
      updateQueue.baseState = memoizedState;
    }
  }

  function mountClassInstance(workInProgress, ctor, newProps) {
    var instance = workInProgress.stateNode;
    instance.props = newProps;
    instance.state = workInProgress.memoizedState;
    var updateQueue = workInProgress.updateQueue;
    if (updateQueue !== null) {
      (0, _ReactUpdateQueue.processUpdateQueue)(workInProgress, updateQueue);
      instance.state = workInProgress.memoizedState;
    }
    var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
    if (typeof getDerivedStateFromProps === 'function') {
      applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, newProps);
      instance.state = workInProgress.memoizedState;
    }
  }

  function checkShouldComponentUpdate(workInProgress, newProps, newState) {
    var instance = workInProgress.stateNode;
    if (typeof instance.shouldComponentUpdate === 'function') {
      var shouldUpdate = instance.shouldComponentUpdate(newProps, newState);
      return shouldUpdate;
    }
    return true;
  }

  function updateClassInstance(current, workInProgress, ctor, newProps) {
    var instance = workInProgress.stateNode;
    var oldProps = workInProgress.memoizedProps;
    instance.props = oldProps;
    var oldState = workInProgress.memoizedState;
    var newState = instance.state = oldState;
    var updateQueue = workInProgress.updateQueue;
    if (updateQueue !== null) {
      (0, _ReactUpdateQueue.processUpdateQueue)(workInProgress, updateQueue);
      newState = workInProgress.memoizedState;
    }
    if (oldProps === newProps && oldState === newState) {
      return false;
    }
    var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
    if (typeof getDerivedStateFromProps === 'function') {
      applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, newProps);
      newState = workInProgress.memoizedState;
    }
    var shouldUpdate = checkShouldComponentUpdate(workInProgress, newProps, newState);
    if (shouldUpdate) {
      if (typeof instance.componentDidUpdate === 'function') {
        workInProgress.effectTag |= _ReactSideEffectTags.Update;
      }
    }
    instance.props = newProps;
    instance.state = newState;
    return shouldUpdate;
  }

  function updateClassComponent(current, workInProgress, Component, nextProps, renderExpirationTime) {
    var shouldUpdate = void 0;
    if (current === null) {
      constructClassInstance(workInProgress, Component, nextProps);
      mountClassInstance(workInProgress, Component, nextProps);
      shouldUpdate = true;
    } else {
      shouldUpdate = updateClassInstance(current, workInProgress, Component, nextProps);
    }
    return finishClassComponent(current, workInProgress, shouldUpdate, renderExpirationTime);
  }

  function cloneChildFibers(workInProgress) {
    if (workInProgress.child === null) {
      return;
    }
    var currentChild = workInProgress.child;
    var newChild = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
    workInProgress.child = newChild;
    newChild.return = workInProgress;
    while (currentChild.sibling !== null) {
      currentChild = currentChild.sibling;
      newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
      newChild.return = workInProgress;
    }
    newChild.sibling = null;
  }

  function finishClassComponent(current, workInProgress, shouldUpdate, renderExpirationTime) {
    if (!shouldUpdate) {
      cloneChildFibers(workInProgress);
    } else {
      var instance = workInProgress.stateNode;
      var nextChildren = instance.render();
      reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
      memoizeState(workInProgress, instance.state);
      memoizeProps(workInProgress, instance.props);
    }
    return workInProgress.child;
  }

  function reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime) {
    if (current === null) {
      shouldTrackSideEffects = false;
      workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
    } else {
      shouldTrackSideEffects = true;
      workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime);
    }
  }

  function reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
    if (newChild) {
      var childArray = Array.isArray(newChild) ? newChild : [newChild];
      return reconcileChildrenArray(returnFiber, currentFirstChild, childArray, expirationTime);
    } else {
      return null;
    }
  }

  function createFiberFromFragment(element, expirationTime) {
    var pendingProps = element;
    var fiber = new _ReactFiber.FiberNode(_ReactWorkTags.Fragment, pendingProps);
    fiber.type = element.type;
    fiber.expirationTime = expirationTime;
    return fiber;
  }

  function createFiberFromElement(element, expirationTime) {
    var fiber = void 0;
    var type = element.type;
    var pendingProps = element.props;
    var fiberTag = void 0;
    if (typeof type === 'function') {
      fiberTag = _ReactWorkTags.ClassComponent;
    } else if (typeof type === 'string') {
      fiberTag = _ReactWorkTags.HostComponent;
    } else {
      fiberTag = _ReactWorkTags.SuspenseComponent;
    }
    fiber = new _ReactFiber.FiberNode(fiberTag, pendingProps);
    fiber.type = type;
    fiber.expirationTime = expirationTime;
    return fiber;
  }

  function useFiber(fiber, pendingProps, expirationTime) {
    var clone = createWorkInProgress(fiber, pendingProps, expirationTime);
    clone.sibling = null;
    return clone;
  }

  function createChild(returnFiber, newChild, expirationTime) {
    if (newChild instanceof Array) {
      var created = createFiberFromFragment(newChild, expirationTime);
      created.return = returnFiber;
      return created;
    }
    if ((typeof newChild === 'undefined' ? 'undefined' : _typeof(newChild)) === 'object' && newChild !== null) {
      var _created = createFiberFromElement(newChild, expirationTime);
      _created.return = returnFiber;
      return _created;
    }
    return null;
  }

  function updateElement(returnFiber, current, element, expirationTime) {
    if (current !== null && current.type === element.type) {
      var existing = useFiber(current, element.props, expirationTime);
      existing.return = returnFiber;
      return existing;
    } else {
      var created = createFiberFromElement(element, expirationTime);
      created.return = returnFiber;
      return created;
    }
  }

  function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
    if (newChild instanceof Array) {
      if (oldFiber === null || oldFiber.tag !== _ReactWorkTags.Fragment) {
        // Insert
        var created = createFiberFromFragment(newChild, expirationTime);
        created.return = returnFiber;
        return created;
      } else {
        // Update
        var existing = useFiber(oldFiber, newChild, expirationTime);
        existing.return = returnFiber;
        return existing;
      }
    }
    if ((typeof newChild === 'undefined' ? 'undefined' : _typeof(newChild)) === 'object' && newChild !== null) {
      return updateElement(returnFiber, oldFiber, newChild, expirationTime);
    }
    return null;
  }

  function deleteChild(returnFiber, childToDelete) {
    var last = returnFiber.lastEffect;
    if (last !== null) {
      last.nextEffect = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else {
      returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }
    childToDelete.nextEffect = null;
    childToDelete.effectTag = _ReactSideEffectTags.Deletion;
  }

  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {
    var resultingFirstChild = null;
    var previousNewFiber = null;
    var oldFiber = currentFirstChild;
    var newIdx = 0;
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          deleteChild(returnFiber, oldFiber);
          newFiber.effectTag = _ReactSideEffectTags.Placement;
        }
      }
      if (resultingFirstChild === null) {
        resultingFirstChild = newFiber;
      } else {
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = oldFiber.sibling;
    }
    if (oldFiber === null) {
      for (; newIdx < newChildren.length; newIdx++) {
        var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);
        if (shouldTrackSideEffects && _newFiber.alternate === null) {
          _newFiber.effectTag = _ReactSideEffectTags.Placement;
        }
        if (resultingFirstChild === null) {
          resultingFirstChild = _newFiber;
        } else {
          previousNewFiber.sibling = _newFiber;
        }
        previousNewFiber = _newFiber;
      }
      return resultingFirstChild;
    }
  }

  function memoizeProps(workInProgress, nextProps) {
    workInProgress.memoizedProps = nextProps;
  }

  function memoizeState(workInProgress, nextState) {
    workInProgress.memoizedState = nextState;
  }

  function updateHostRoot(current, workInProgress, renderExpirationTime) {
    var updateQueue = workInProgress.updateQueue;
    var prevState = workInProgress.memoizedState;
    var prevChildren = prevState !== null ? prevState.element : null;
    (0, _ReactUpdateQueue.processUpdateQueue)(workInProgress, updateQueue);
    var nextState = workInProgress.memoizedState;
    var nextChildren = nextState.element;
    if (nextChildren === prevChildren) {
      cloneChildFibers(workInProgress);
      return workInProgress.child;
    }
    reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
    return workInProgress.child;
  }

  function updateHostComponent(current, workInProgress, renderExpirationTime) {
    var nextProps = workInProgress.pendingProps;
    var nextChildren = nextProps.children;
    var isDirectTextChild = shouldSetTextContent(nextProps);
    if (isDirectTextChild) {
      nextChildren = null;
    }
    reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
    memoizeProps(workInProgress, nextProps);
    return workInProgress.child;
  }

  function markUpdate(workInProgress) {
    workInProgress.effectTag |= _ReactSideEffectTags.Update;
  }

  function appendAllChildren(parent, workInProgress) {
    var node = workInProgress.child;
    while (node !== null) {
      if (node.tag === _ReactWorkTags.HostComponent) {
        appendInitialChild(parent, node.stateNode);
      } else if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === workInProgress) {
        return;
      }
      while (node.sibling === null) {
        if (node.return === null || node.return === workInProgress) {
          return;
        }
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }

  function completeWork(current, workInProgress) {
    var newProps = workInProgress.pendingProps;
    switch (workInProgress.tag) {
      case _ReactWorkTags.ClassComponent:
        {
          break;
        }
      case _ReactWorkTags.HostRoot:
        {
          break;
        }
      case _ReactWorkTags.HostComponent:
        {
          var type = workInProgress.type;
          if (current !== null && workInProgress.stateNode != null) {
            var oldProps = current.memoizedProps;
            var updatePayload = prepareUpdate(oldProps, newProps);
            workInProgress.updateQueue = updatePayload;
            if (updatePayload) {
              markUpdate(workInProgress);
            }
          } else {
            var _instance = createInstance(type, newProps, workInProgress);
            appendAllChildren(_instance, workInProgress);
            finalizeInitialChildren(_instance, newProps);
            workInProgress.stateNode = _instance;
          }
          break;
        }
      case _ReactWorkTags.SuspenseComponent:
      case _ReactWorkTags.Fragment:
        {
          break;
        }
      default:
        {
          throw new Error('Unknown unit of work tag');
        }
    }
    return null;
  }

  function completeUnitOfWork(workInProgress) {
    while (true) {
      var current = workInProgress.alternate;
      var returnFiber = workInProgress.return;
      var siblingFiber = workInProgress.sibling;
      if ((workInProgress.effectTag & _ReactSideEffectTags.Incomplete) === _ReactSideEffectTags.NoEffect) {
        completeWork(current, workInProgress);
        if (returnFiber !== null && (returnFiber.effectTag & _ReactSideEffectTags.Incomplete) === _ReactSideEffectTags.NoEffect) {
          if (returnFiber.firstEffect === null) {
            returnFiber.firstEffect = workInProgress.firstEffect;
          }
          if (workInProgress.lastEffect !== null) {
            if (returnFiber.lastEffect !== null) {
              returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
            }
            returnFiber.lastEffect = workInProgress.lastEffect;
          }
          var effectTag = workInProgress.effectTag;
          if (effectTag >= _ReactSideEffectTags.Placement) {
            if (returnFiber.lastEffect !== null) {
              returnFiber.lastEffect.nextEffect = workInProgress;
            } else {
              returnFiber.firstEffect = workInProgress;
            }
            returnFiber.lastEffect = workInProgress;
          }
        }
        if (siblingFiber !== null) {
          return siblingFiber;
        } else if (returnFiber !== null) {
          workInProgress = returnFiber;
          continue;
        } else {
          return null;
        }
      } else {
        if (workInProgress.tag === _ReactWorkTags.SuspenseComponent) {
          var _effectTag = workInProgress.effectTag;
          workInProgress.effectTag = _effectTag & ~_ReactSideEffectTags.Incomplete | _ReactSideEffectTags.DidCapture;
          return workInProgress;
        }
        if (returnFiber !== null) {
          returnFiber.firstEffect = returnFiber.lastEffect = null;
          returnFiber.effectTag |= _ReactSideEffectTags.Incomplete;
        }
        if (siblingFiber !== null) {
          return siblingFiber;
        } else if (returnFiber !== null) {
          workInProgress = returnFiber;
          continue;
        } else {
          return null;
        }
      }
    }
  }

  function completeRoot(root, finishedWork) {
    root.finishedWork = null;
    scheduledRoot = null;
    commitRoot(root, finishedWork);
  }

  function getHostParentFiber(fiber) {
    var parent = fiber.return;
    while (parent !== null) {
      if (isHostParent(parent)) {
        return parent;
      }
      parent = parent.return;
    }
  }

  function isHostParent(fiber) {
    return fiber.tag === _ReactWorkTags.HostComponent || fiber.tag === _ReactWorkTags.HostRoot;
  }

  function commitPlacement(finishedWork) {
    var parentFiber = getHostParentFiber(finishedWork);
    var parent = parentFiber.tag === _ReactWorkTags.HostRoot ? parentFiber.stateNode.containerInfo : parentFiber.stateNode;
    var node = finishedWork;
    while (true) {
      if (node.tag === _ReactWorkTags.HostComponent) {
        appendChildToContainer(parent, node.stateNode);
      } else if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === finishedWork) {
        return;
      }
      while (node.sibling === null) {
        if (node.return === null || node.return === finishedWork) {
          return;
        }
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }

  function commitWork(finishedWork) {
    switch (finishedWork.tag) {
      case _ReactWorkTags.HostRoot:
      case _ReactWorkTags.ClassComponent:
        {
          return;
        }
      case _ReactWorkTags.HostComponent:
        {
          var instance = finishedWork.stateNode;
          if (instance != null) {
            var updatePayload = finishedWork.updateQueue;
            finishedWork.updateQueue = null;
            if (updatePayload !== null) {
              commitUpdate(instance, updatePayload);
            }
          }
          return;
        }
      case _ReactWorkTags.SuspenseComponent:
        {
          return;
        }
      default:
        {
          throw new Error('This unit of work tag should not have side-effects');
        }
    }
  }

  function commitUnmount(current) {
    if (current.tag === _ReactWorkTags.ClassComponent) {
      var instance = current.stateNode;
      if (typeof instance.componentWillUnmount === 'function') {
        instance.props = current.memoizedProps;
        instance.state = current.memoizedState;
        instance.componentWillUnmount();
      }
    }
  }

  function commitNestedUnmounts(root) {
    var node = root;
    while (true) {
      commitUnmount(node);
      if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === root) {
        return;
      }
      while (node.sibling === null) {
        if (node.return === null || node.return === root) {
          return;
        }
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }

  function commitDeletion(current) {
    var parentFiber = getHostParentFiber(current);
    var parent = parentFiber.tag === _ReactWorkTags.HostRoot ? parentFiber.stateNode.containerInfo : parentFiber.stateNode;
    var node = current;
    while (true) {
      if (node.tag === _ReactWorkTags.HostComponent) {
        commitNestedUnmounts(node);
        removeChildFromContainer(parent, node.stateNode);
      } else {
        commitUnmount(node);
        if (node.child !== null) {
          node.child.return = node;
          node = node.child;
          continue;
        }
      }
      if (node === current) {
        break;
      }
      while (node.sibling === null) {
        if (node.return === null || node.return === current) {
          break;
        }
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
    current.return = null;
    current.child = null;
    if (current.alternate) {
      current.alternate.child = null;
      current.alternate.return = null;
    }
  }

  function commitAllHostEffects(firstEffect) {
    var nextEffect = firstEffect;
    while (nextEffect !== null) {
      var effectTag = nextEffect.effectTag;
      switch (effectTag & (_ReactSideEffectTags.Placement | _ReactSideEffectTags.Update | _ReactSideEffectTags.Deletion)) {
        case _ReactSideEffectTags.Placement:
          {
            commitPlacement(nextEffect);
            nextEffect.effectTag &= ~_ReactSideEffectTags.Placement;
            break;
          }
        case _ReactSideEffectTags.Update:
          {
            commitWork(nextEffect);
            break;
          }
        case _ReactSideEffectTags.Deletion:
          {
            commitDeletion(nextEffect);
            break;
          }
      }
      nextEffect = nextEffect.nextEffect;
    }
  }

  function commitBeforeMutationLifeCycles(firstEffect) {
    var nextEffect = firstEffect;
    while (nextEffect !== null) {
      if (nextEffect.tag === _ReactWorkTags.ClassComponent) {
        var instance = nextEffect.stateNode;
        var getSnapshotBeforeUpdate = nextEffect.stateNode.getSnapshotBeforeUpdate;
        if (typeof getSnapshotBeforeUpdate === 'function') {
          var current = nextEffect.alternate;
          var prevProps = current.memoizedProps;
          var prevState = current.memoizedState;
          instance.props = nextEffect.memoizedProps;
          instance.state = nextEffect.memoizedState;
          var snapshot = getSnapshotBeforeUpdate(prevProps, prevState);
          instance.__reactInternalSnapshotBeforeUpdate = snapshot;
        }
      }
      nextEffect = nextEffect.nextEffect;
    }
  }

  function commitAllLifeCycles(firstEffect) {
    var nextEffect = firstEffect;
    while (nextEffect !== null) {
      if (nextEffect.tag === _ReactWorkTags.ClassComponent) {
        var instance = nextEffect.stateNode;
        var componentDidMount = instance.componentDidMount;
        var componentDidUpdate = instance.componentDidUpdate;
        var current = nextEffect.alternate;
        if (current === null) {
          if (typeof componentDidMount === 'function') {
            instance.props = nextEffect.memoizedProps;
            instance.state = nextEffect.memoizedState;
            instance.componentDidMount();
          }
        } else {
          if (typeof componentDidUpdate === 'function') {
            var prevProps = current.memoizedProps;
            var prevState = current.memoizedState;
            instance.props = nextEffect.memoizedProps;
            instance.state = nextEffect.memoizedState;
            instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
          }
        }
      }
      nextEffect = nextEffect.nextEffect;
    }
  }

  function commitRoot(root, finishedWork) {
    isWorking = true;
    isCommitting = true;
    root.expirationTime = _ReactFiberExpirationTime.NoWork;
    var firstEffect = finishedWork.firstEffect;
    commitBeforeMutationLifeCycles(firstEffect);
    commitAllHostEffects(firstEffect);
    root.current = finishedWork;
    commitAllLifeCycles(firstEffect);
    isCommitting = false;
    isWorking = false;
  }

  function dispatchEventWithBatch(nativeEvent) {
    var type = nativeEvent.type;
    var previousIsBatchingInteractiveUpdates = isBatchingInteractiveUpdates;
    var previousIsBatchingUpdates = isBatchingUpdates;
    var previousIsDispatchControlledEvent = isDispatchControlledEvent;
    if (type === 'change') {
      isDispatchControlledEvent = true;
    }
    if ((0, _isInteractiveEvent.isInteractiveEvent)(type)) {
      isBatchingInteractiveUpdates = true;
    }
    isBatchingUpdates = true;

    try {
      return dispatchEvent(nativeEvent);
    } finally {
      isBatchingInteractiveUpdates = previousIsBatchingInteractiveUpdates;
      isBatchingUpdates = previousIsBatchingUpdates;
      if (!isBatchingUpdates && !isRendering) {
        if (isDispatchControlledEvent) {
          isDispatchControlledEvent = previousIsDispatchControlledEvent;
          if (scheduledRoot) {
            performSyncWork();
          }
        } else {
          if (scheduledRoot) {
            scheduleCallbackWithExpirationTime(scheduledRoot, scheduledRoot.expirationTime);
          }
        }
      }
    }
  }

  function dispatchEvent(nativeEvent) {
    var listeners = [];
    var nativeEventTarget = nativeEvent.target || nativeEvent.srcElement;
    var targetInst = nativeEventTarget.internalInstanceKey;
    (0, _ReactTreeTraversal.traverseTwoPhase)(targetInst, accumulateDirectionalDispatches.bind(null, listeners), nativeEvent);
    listeners.forEach(function (listener) {
      return listener(nativeEvent);
    });
  }

  function accumulateDirectionalDispatches(acc, inst, phase, nativeEvent) {
    var type = nativeEvent.type;
    var registrationName = 'on' + type[0].toLocaleUpperCase() + type.slice(1);
    if (phase === 'captured') {
      registrationName = registrationName + 'Capture';
    }
    var stateNode = inst.stateNode;
    var props = stateNode.internalEventHandlersKey;
    var listener = props[registrationName];
    if (listener) {
      acc.push(listener);
    }
  }

  return {
    createContainer: createContainer,
    updateContainer: updateContainer,
    dispatchEventWithBatch: dispatchEventWithBatch
  };
}

exports.default = Reconciler;
},{"./ReactFiberExpirationTime":"uHoo","./ReactUpdateQueue":"YmSv","./ReactFiberRoot":"a+Ks","./ReactFiber":"K36e","../event/isInteractiveEvent":"EDZr","../shared/ReactWorkTags":"hOTV","../shared/ReactSideEffectTags":"e6GS","../shared/ReactTreeTraversal":"eIcv"}],"cJEg":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomDom = undefined;

var _Reconciler = require('./reconciler/Reconciler');

var _Reconciler2 = _interopRequireDefault(_Reconciler);

var _isInteractiveEvent = require('./event/isInteractiveEvent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customRenderer = void 0;

var hostConfig = {
  now: function now() {
    // return performance.now
    return Date.now();
  },
  shouldSetTextContent: function shouldSetTextContent(props) {
    return typeof props.children === 'string' || typeof props.children === 'number';
  },
  createInstance: function createInstance(type, props, internalInstanceHandle) {
    var domElement = document.createElement(type);
    domElement.internalInstanceKey = internalInstanceHandle;
    domElement.internalEventHandlersKey = props;
    return domElement;
  },
  finalizeInitialChildren: function finalizeInitialChildren(domElement, props) {
    Object.keys(props).forEach(function (propKey) {
      var propValue = props[propKey];
      if (propKey === 'children') {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          domElement.textContent = propValue;
        }
      } else if (propKey === 'style') {
        var style = domElement.style;
        Object.keys(propValue).forEach(function (styleName) {
          var styleValue = propValue[styleName];
          style.setProperty(styleName, styleValue);
        });
      } else if (propKey === 'className') {
        domElement.setAttribute('class', propValue);
      } else if (_isInteractiveEvent.registrationNames.includes(propKey) || propKey === 'onChange') {
        var eventType = propKey.slice(2).toLocaleLowerCase();
        if (eventType.endsWith('capture')) {
          eventType = eventType.slice(0, -7);
        }
        document.addEventListener(eventType, customRenderer.dispatchEventWithBatch);
      } else {
        var _propValue = props[propKey];
        domElement.setAttribute(propKey, _propValue);
      }
    });
  },
  appendInitialChild: function appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },
  appendChildToContainer: function appendChildToContainer(container, child) {
    container.appendChild(child);
  },
  removeChildFromContainer: function removeChildFromContainer(container, child) {
    container.removeChild(child);
  },
  scheduleDeferredCallback: function scheduleDeferredCallback(callback, options) {
    requestIdleCallback(callback, options);
  },
  prepareUpdate: function prepareUpdate(oldProps, newProps) {
    var updatePayload = null;
    var styleUpdates = null;
    Object.keys(newProps).forEach(function (propKey) {
      var nextProp = newProps[propKey];
      var lastProp = oldProps[propKey];
      if (nextProp !== lastProp && (typeof nextProp === 'string' || typeof nextProp === 'number')) {
        (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
      }
      if (propKey === 'style') {
        for (var styleName in nextProp) {
          if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
            styleUpdates = nextProp;
            break;
          }
        }
        if (styleUpdates) {
          (updatePayload = updatePayload || []).push(propKey, styleUpdates);
        }
      }
    });
    return updatePayload;
  },
  commitUpdate: function commitUpdate(domElement, updatePayload) {
    var _loop = function _loop(i) {
      var propKey = updatePayload[i];
      var propValue = updatePayload[i + 1];
      if (propKey === 'children') {
        domElement.textContent = propValue;
      } else if (propKey === 'style') {
        var style = domElement.style;
        Object.keys(propValue).forEach(function (styleName) {
          var styleValue = propValue[styleName];
          style.setProperty(styleName, styleValue);
        });
      } else {
        domElement[propKey] = propValue;
      }
    };

    for (var i = 0; i < updatePayload.length; i += 2) {
      _loop(i);
    }
  }
};

customRenderer = (0, _Reconciler2.default)(hostConfig);

var CustomDom = exports.CustomDom = {
  render: function render(reactElement, container) {
    var root = container._reactRootContainer;
    if (!root) {
      // initial mount
      var isConcurrent = true; // concurrent mode
      root = container._reactRootContainer = customRenderer.createContainer(container, isConcurrent);
    }
    customRenderer.updateContainer(reactElement, root);
  }
};
},{"./reconciler/Reconciler":"2SB4","./event/isInteractiveEvent":"EDZr"}],"vKFU":[function(require,module,exports) {

},{}],"xLDQ":[function(require,module,exports) {
module.exports = "/logo.6d6756e8.svg";
},{}],"lY9v":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('./react');

var _react2 = _interopRequireDefault(_react);

var _logo = require('./logo.svg');

var _logo2 = _interopRequireDefault(_logo);

require('./App.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// class ColorText extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       colorIndex: 0
//     }
//   }
//   render () {
//     const colorPanel = ['red', 'blue']
//     return (
//       <div
//         className="color-flip"
//         style={{color: colorPanel[this.state.colorIndex]}}
//         onClick={() => this.setState({ colorIndex: (this.state.colorIndex + 1) % colorPanel.length })}
//       >
//         {this.props.children}
//       </div>
//     )
//   }
// }

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       counter: 0,
//       value: ''
//     };
//     this.handleChange = this.handleChange.bind(this)
//   }

//   shouldComponentUpdate (nextProps, nextState) {
//     if (this.state.counter === 1) {
//       return false
//     }
//     return true
//   }

//   componentDidMount () {
//     this.setState({counter: 1})
//   }

//   componentDidUpdate (prevProps, prevState, snapshot) {
//     // if (this.state.counter === 3) {
//     //   this.setState({counter: 0})
//     // }
//   }

//   handleChange (event) {
//     this.setState({value: event.target.value});
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <div className="App-intro">
//           <input type="text" value={this.state.value} onInput={this.handleChange} />
//           <ColorText>      
//             <div className="button-container">
//               <button className="decrement-button" onClick={() => {
//                 this.setState({ counter: this.state.counter - 1 })
//               }}>
//                 -
//               </button>
//               <div className="counter-text">{this.state.counter}</div>
//               <button className="increment-button" onClick={() => {
//                 this.setState({ counter: this.state.counter + 1 })
//                 this.setState({ counter: this.state.counter + 1 })
//               }}>
//                 +
//               </button>
//             </div>
//           </ColorText>
//         </div>
//       </div>
//     );
//   }
// }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.onChange = _this.onChange.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        var divs = [];
        //   for (let i = 0; i < 100; i++) {
        //     divs.push(<div key={i}>{i}</div>)
        //   }
        _this.state = {
            inputValue: "",
            divs: divs
        };
        return _this;
    }

    _createClass(App, [{
        key: 'onChange',
        value: function onChange(e) {
            this.setState({
                inputValue: e.target.value
            });
        }
    }, {
        key: 'onClick',
        value: function onClick(e) {
            var divs = [];
            for (var i = 0; i < 10000; i++) {
                divs.push(_react2.default.createElement(
                    'div',
                    { key: i },
                    i
                ));
            }
            this.setState({
                divs: divs
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var divs = [];
            var inputValue = this.state.inputValue;
            for (var i = 0; i < 10000; i++) {
                divs.push(_react2.default.createElement(
                    'div',
                    { key: i },
                    inputValue
                ));
            }
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', { onChange: this.onChange, value: this.state.inputValue }),
                _react2.default.createElement(
                    'button',
                    { onClick: this.onClick },
                    'click'
                ),
                this.state.divs
            );
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;
},{"./react":"hYfm","./logo.svg":"xLDQ","./App.css":"vKFU"}],"Focm":[function(require,module,exports) {
'use strict';

var _react = require('./react');

var _react2 = _interopRequireDefault(_react);

var _CustomDom = require('./CustomDom');

require('./index.css');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_CustomDom.CustomDom.render(_react2.default.createElement(_App2.default, null), document.getElementById('root'));
},{"./react":"hYfm","./CustomDom":"cJEg","./index.css":"vKFU","./App":"lY9v"}]},{},["Focm"], null)
//# sourceMappingURL=/src.0828baba.map