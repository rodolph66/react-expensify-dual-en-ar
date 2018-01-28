# Git Commands

git init    - Create a new git repo
git status  - View changes to the project files
git add     - add files to the staging area
git commit  - createa new commit with files from staging area
git log     - View recent commits' details


# in Git Bash console

ls -a ~/.ssh  - To check if ssh keys are available (to use with github)


Changing CSS classes conditionally:

sample:

//capsule.css
.base {
  background-color: white;
  color: rbg(114,110,101);
  font-size: 11px;
  padding: 20px;
  position: relative
}
.clickable {
  compose: base;
  cursor: pointer;
}
.withIcon {
  compose: base;
  padding-left: 62px;
}

//capsuleComponent.js
import cx from "classnames"; // npm module classnames
import styles from "/capsule.css";

let customClass = cx(styles.base, {
  [styles.clickable]: this.props.clickable,
  [styles.withIcon]: !!this.props.icon
})

return <div className={customClass}>