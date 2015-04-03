<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

/* @var $this \yii\web\View */
/* @var $content string */

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>

<?php $this->beginBody() ?>
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <a class="navbar-brand" href="<?= Yii::$app->homeUrl?>">Портал звернень громадян</a>
            </div>
        </nav>
        <center>
            <img src="<?= Yii::$app->homeUrl ?>img/logo.png" border="0" style="margin-top:20px;">
        </center>
        <?= $content ?>
    </div>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
